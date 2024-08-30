/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  TextInput,
  TextInputSubmitEditingEventData,
  TextStyle,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  TextInputProps,
  TextInputKeyPressEventData,
  TextInputFocusEventData,
  TextInputContentSizeChangeEventData,
} from 'react-native';
import React, {useEffect, useRef, useCallback, useMemo, useLayoutEffect} from 'react';
import type {CSSProperties, MutableRefObject, ReactEventHandler, FocusEventHandler, MouseEvent, KeyboardEvent, SyntheticEvent, ClipboardEventHandler} from 'react';
import {StyleSheet} from 'react-native';
import {updateInputStructure} from './web/utils/parserUtils';
import InputHistory from './web/InputHistory';
import type {TreeNode} from './web/utils/treeUtils';
import {getCurrentCursorPosition, removeSelection, setCursorPosition} from './web/utils/cursorUtils';
import './web/MarkdownTextInput.css';
import type {MarkdownStyle} from './MarkdownTextInputDecoratorViewNativeComponent';
import {getElementHeight, getPlaceholderValue, isEventComposing, normalizeValue, parseInnerHTMLToText} from './web/utils/inputUtils';
import {parseToReactDOMStyle, processMarkdownStyle} from './web/utils/webStyleUtils';

require('../parser/react-native-live-markdown-parser.js');

const useClientEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface MarkdownTextInputProps extends TextInputProps {
  markdownStyle?: MarkdownStyle;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  dir?: string;
  disabled?: boolean;
}

interface MarkdownNativeEvent extends Event {
  inputType: string;
}

type Selection = {
  start: number;
  end: number;
};

type Dimensions = {
  width: number;
  height: number;
};

type ParseTextResult = {
  text: string;
  cursorPosition: number | null;
};

let focusTimeout: NodeJS.Timeout | null = null;

type MarkdownTextInputElement = HTMLDivElement &
  HTMLInputElement & {
    tree: TreeNode;
    selection: Selection;
  };

type HTMLMarkdownElement = HTMLElement & {
  value: string;
};

const MarkdownTextInput = React.forwardRef<TextInput, MarkdownTextInputProps>(
  (
    {
      accessibilityLabel,
      accessibilityLabelledBy,
      accessibilityRole,
      autoCapitalize = 'sentences',
      autoCorrect = true,
      blurOnSubmit = false,
      clearTextOnFocus,
      dir = 'auto',
      disabled = false,
      numberOfLines,
      multiline = false,
      markdownStyle,
      onBlur,
      onChange,
      onChangeText,
      onClick,
      onFocus,
      onKeyPress,
      onSelectionChange,
      onSubmitEditing,
      placeholder,
      placeholderTextColor = `rgba(0,0,0,0.2)`,
      selectTextOnFocus,
      spellCheck,
      selection,
      style = {},
      value,
      autoFocus = false,
      onContentSizeChange,
      id,
      inputMode,
    },
    ref,
  ) => {
    const compositionRef = useRef<boolean>(false);
    const divRef = useRef<MarkdownTextInputElement | null>(null);
    const currentlyFocusedField = useRef<HTMLDivElement | null>(null);
    const contentSelection = useRef<Selection | null>(null);
    const className = `react-native-live-markdown-input-${multiline ? 'multiline' : 'singleline'}`;
    const history = useRef<InputHistory>();
    const dimensions = useRef<Dimensions | null>(null);
    const pasteContent = useRef<string | null>(null);

    if (!history.current) {
      history.current = new InputHistory(100, 150, value || '');
    }

    const flattenedStyle = useMemo(() => StyleSheet.flatten(style), [style]);

    // Empty placeholder would collapse the div, so we need to use zero-width space to prevent it
    const heightSafePlaceholder = useMemo(() => getPlaceholderValue(placeholder), [placeholder]);

    const setEventProps = useCallback((e: NativeSyntheticEvent<any>) => {
      if (divRef.current) {
        const text = divRef.current.value;
        if (e.target) {
          // TODO: change the logic here so every event have value property
          (e.target as unknown as HTMLInputElement).value = text;
        }
        if (e.nativeEvent && e.nativeEvent.text) {
          e.nativeEvent.text = text;
        }
      }
      return e;
    }, []);

    const parseText = useCallback(
      (
        target: MarkdownTextInputElement,
        text: string | null,
        customMarkdownStyles: MarkdownStyle,
        cursorPosition: number | null = null,
        shouldAddToHistory = true,
        shouldForceDOMUpdate = false,
      ): ParseTextResult => {
        if (!divRef.current) {
          return {text: text || '', cursorPosition: null};
        }

        if (text === null) {
          return {text: divRef.current.value, cursorPosition: null};
        }
        const parsedText = updateInputStructure(target, text, cursorPosition, customMarkdownStyles, !multiline, shouldForceDOMUpdate);
        divRef.current.value = parsedText.text;

        if (history.current && shouldAddToHistory) {
          history.current.throttledAdd(parsedText.text, parsedText.cursorPosition);
        }

        return parsedText;
      },
      [multiline],
    );

    const processedMarkdownStyle = useMemo(() => {
      const newMarkdownStyle = processMarkdownStyle(markdownStyle);
      if (divRef.current) {
        parseText(divRef.current, divRef.current.value, newMarkdownStyle, null, false);
      }
      return newMarkdownStyle;
    }, [markdownStyle, parseText]);

    const inputStyles = useMemo(
      () =>
        StyleSheet.flatten([
          styles.defaultInputStyles,
          flattenedStyle && {
            caretColor: (flattenedStyle as TextStyle).color || 'black',
          },
          disabled && styles.disabledInputStyles,
          parseToReactDOMStyle(flattenedStyle),
        ]) as CSSProperties,
      [flattenedStyle, disabled],
    );

    const undo = useCallback(
      (target: MarkdownTextInputElement): ParseTextResult => {
        if (!history.current) {
          return {
            text: '',
            cursorPosition: 0,
          };
        }
        const item = history.current.undo();
        const undoValue = item ? item.text : null;
        return parseText(target, undoValue, processedMarkdownStyle, item ? item.cursorPosition : null, false);
      },
      [parseText, processedMarkdownStyle],
    );

    const redo = useCallback(
      (target: MarkdownTextInputElement): ParseTextResult => {
        if (!history.current) {
          return {
            text: '',
            cursorPosition: 0,
          };
        }
        const item = history.current.redo();
        const redoValue = item ? item.text : null;
        return parseText(target, redoValue, processedMarkdownStyle, item ? item.cursorPosition : null, false);
      },
      [parseText, processedMarkdownStyle],
    );

    // Placeholder text color logic
    const updateTextColor = useCallback(
      (node: HTMLDivElement, text: string) => {
        // eslint-disable-next-line no-param-reassign -- we need to change the style of the node, so we need to modify it
        node.style.color = String(placeholder && (text === '' || text === '\n') ? placeholderTextColor : flattenedStyle.color || 'black');
      },
      [flattenedStyle.color, placeholder, placeholderTextColor],
    );

    const handleSelectionChange: ReactEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        const e = event as unknown as NativeSyntheticEvent<TextInputSelectionChangeEventData>;
        setEventProps(e);
        if (onSelectionChange && contentSelection.current) {
          e.nativeEvent.selection = contentSelection.current;
          onSelectionChange(e);
        }
      },
      [onSelectionChange, setEventProps],
    );

    const updateRefSelectionVariables = useCallback((newSelection: Selection) => {
      if (!divRef.current) {
        return;
      }
      const {start, end} = newSelection;
      divRef.current.selection = {start, end};
    }, []);

    const updateSelection = useCallback(
      (e: SyntheticEvent<HTMLDivElement>, predefinedSelection: Selection | null = null) => {
        if (!divRef.current) {
          return;
        }
        const newSelection = predefinedSelection || getCurrentCursorPosition(divRef.current);

        if (newSelection && (!contentSelection.current || contentSelection.current.start !== newSelection.start || contentSelection.current.end !== newSelection.end)) {
          updateRefSelectionVariables(newSelection);
          contentSelection.current = newSelection;

          handleSelectionChange(e);
        }
      },
      [handleSelectionChange, updateRefSelectionVariables],
    );

    const handleContentSizeChange = useCallback(() => {
      if (!divRef.current || !multiline || !onContentSizeChange) {
        return;
      }

      const {offsetWidth: newWidth, offsetHeight: newHeight} = divRef.current;

      if (newHeight !== dimensions.current?.height || newWidth !== dimensions.current.width) {
        dimensions.current = {height: newHeight, width: newWidth};

        onContentSizeChange({
          nativeEvent: {
            contentSize: dimensions.current,
          },
        } as NativeSyntheticEvent<TextInputContentSizeChangeEventData>);
      }
    }, [multiline, onContentSizeChange]);

    const handleOnChangeText = useCallback(
      (e: SyntheticEvent<HTMLDivElement>) => {
        if (!divRef.current || !(e.target instanceof HTMLElement) || !contentSelection.current) {
          return;
        }
        const nativeEvent = e.nativeEvent as MarkdownNativeEvent;
        const inputType = nativeEvent.inputType;

        updateTextColor(divRef.current, e.target.textContent ?? '');
        const previousText = divRef.current.value;
        const parsedText = normalizeValue(inputType === 'pasteText' ? pasteContent.current || '' : parseInnerHTMLToText(e.target as MarkdownTextInputElement));

        if (pasteContent.current) {
          pasteContent.current = null;
        }

        const prevSelection = contentSelection.current ?? {start: 0, end: 0};
        const newCursorPosition = Math.max(Math.max(contentSelection.current.end, 0) + (parsedText.length - previousText.length), 0);

        if (compositionRef.current) {
          divRef.current.value = parsedText;
          compositionRef.current = false;
          contentSelection.current.end = newCursorPosition;
          return;
        }

        let newInputUpdate: ParseTextResult;
        switch (inputType) {
          case 'historyUndo':
            newInputUpdate = undo(divRef.current);
            break;
          case 'historyRedo':
            newInputUpdate = redo(divRef.current);
            break;
          default:
            newInputUpdate = parseText(divRef.current, parsedText, processedMarkdownStyle, newCursorPosition, true, !inputType);
        }
        const {text, cursorPosition} = newInputUpdate;
        updateTextColor(divRef.current, text);
        updateSelection(e, {
          start: cursorPosition ?? 0,
          end: cursorPosition ?? 0,
        });

        if (onChange) {
          const event = e as unknown as NativeSyntheticEvent<{
            count: number;
            before: number;
            start: number;
          }>;
          setEventProps(event);

          // The new text is between the prev start selection and the new end selection, can be empty
          const addedText = text.slice(prevSelection.start, cursorPosition ?? 0);
          // The length of the text that replaced the before text
          const count = addedText.length;
          // The start index of the replacement operation
          let start = prevSelection.start;

          const prevSelectionRange = prevSelection.end - prevSelection.start;
          // The length the deleted text had before
          let before = prevSelectionRange;
          if (prevSelectionRange === 0 && (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward')) {
            // its possible the user pressed a delete key without a selection range, so we need to adjust the before value to have the length of the deleted text
            before = previousText.length - text.length;
          }

          if (inputType === 'deleteContentBackward') {
            // When the user does a backspace delete he expects the content before the cursor to be removed.
            // For this the start value needs to be adjusted (its as if the selection was before the text that we want to delete)
            start = Math.max(start - before, 0);
          }

          event.nativeEvent.count = count;
          event.nativeEvent.before = before;
          event.nativeEvent.start = start;

          // @ts-expect-error TODO: Remove once react native PR merged https://github.com/facebook/react-native/pull/45248
          onChange(event);
        }

        if (onChangeText) {
          onChangeText(text);
        }

        handleContentSizeChange();
      },
      [updateTextColor, updateSelection, onChange, onChangeText, handleContentSizeChange, undo, redo, parseText, processedMarkdownStyle, setEventProps],
    );

    const insertText = useCallback(
      (e: SyntheticEvent<HTMLDivElement, Event>, text: string) => {
        if (!contentSelection.current || !divRef.current) {
          return;
        }

        const previousText = divRef.current.value;
        const newText = `${divRef.current.value.substring(0, contentSelection.current.start)}${text}${divRef.current.value.substring(contentSelection.current.end)}`;
        if (previousText === newText) {
          document.execCommand('delete');
        }

        pasteContent.current = newText;
        (e.nativeEvent as MarkdownNativeEvent).inputType = 'pasteText';

        handleOnChangeText(e);
      },
      [handleOnChangeText],
    );

    const handleKeyPress = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (!divRef.current) {
          return;
        }

        const hostNode = e.target;
        e.stopPropagation();

        if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          const nativeEvent = e.nativeEvent as unknown as MarkdownNativeEvent;
          if (e.shiftKey) {
            nativeEvent.inputType = 'historyRedo';
          } else {
            nativeEvent.inputType = 'historyUndo';
          }

          handleOnChangeText(e);
          return;
        }

        const blurOnSubmitDefault = !multiline;
        const shouldBlurOnSubmit = blurOnSubmit === null ? blurOnSubmitDefault : blurOnSubmit;

        const nativeEvent = e.nativeEvent;
        const isComposing = isEventComposing(nativeEvent);

        const event = e as unknown as NativeSyntheticEvent<TextInputKeyPressEventData>;
        setEventProps(event);
        if (onKeyPress) {
          onKeyPress(event);
        }

        if (
          e.key === 'Enter' &&
          // Do not call submit if composition is occuring.
          !isComposing &&
          !e.isDefaultPrevented()
        ) {
          // prevent "Enter" from inserting a newline or submitting a form
          e.preventDefault();
          if (!e.shiftKey && (blurOnSubmit || !multiline) && onSubmitEditing) {
            onSubmitEditing(event as unknown as NativeSyntheticEvent<TextInputSubmitEditingEventData>);
          } else if (multiline) {
            //   We need to change normal behavior of "Enter" key to insert a line breaks, to prevent wrapping contentEditable text in <div> tags.
            //  Thanks to that in every situation we have proper amount of new lines in our parsed text. Without it pressing enter in empty lines will add 2 more new lines.
            insertText(e, '\n');
          }
          if (!e.shiftKey && ((shouldBlurOnSubmit && hostNode !== null) || !multiline)) {
            setTimeout(() => divRef.current && divRef.current.blur(), 0);
          }
        }
      },
      [multiline, blurOnSubmit, setEventProps, onKeyPress, handleOnChangeText, onSubmitEditing, insertText],
    );

    const handleFocus: FocusEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        const e = event as unknown as NativeSyntheticEvent<TextInputFocusEventData>;
        const hostNode = e.target as unknown as HTMLDivElement;
        currentlyFocusedField.current = hostNode;
        setEventProps(e);
        if (divRef.current) {
          if (contentSelection.current) {
            setCursorPosition(divRef.current, contentSelection.current.start, contentSelection.current.end);
          } else {
            const valueLength = value ? value.length : divRef.current.value.length;
            setCursorPosition(divRef.current, valueLength, null);
          }
        }

        if (onFocus) {
          setEventProps(e);
          onFocus(e);
        }

        if (hostNode !== null) {
          if (clearTextOnFocus && divRef.current) {
            divRef.current.textContent = '';
          }
          if (selectTextOnFocus) {
            // Safari requires selection to occur in a setTimeout
            if (focusTimeout !== null) {
              clearTimeout(focusTimeout);
            }
            focusTimeout = setTimeout(() => {
              if (hostNode === null) {
                return;
              }
              document.execCommand('selectAll', false, '');
            }, 0);
          }
        }
      },
      [clearTextOnFocus, onFocus, selectTextOnFocus, setEventProps, value],
    );

    const handleBlur: FocusEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        const e = event as unknown as NativeSyntheticEvent<TextInputFocusEventData>;
        removeSelection();
        currentlyFocusedField.current = null;
        if (onBlur) {
          setEventProps(e);
          onBlur(e);
        }
      },
      [onBlur, setEventProps],
    );

    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (!onClick || !divRef.current) {
          return;
        }
        (e.target as HTMLInputElement).value = divRef.current.value;
        onClick(e);
      },
      [onClick],
    );

    const handleCopy: ClipboardEventHandler<HTMLDivElement> = useCallback((e) => {
      if (!divRef.current || !contentSelection.current) {
        return;
      }
      e.preventDefault();
      const text = divRef.current?.value.substring(contentSelection.current.start, contentSelection.current.end);
      e.clipboardData.setData('text/plain', text ?? '');
    }, []);

    const handleCut = useCallback(
      (e) => {
        if (!divRef.current || !contentSelection.current) {
          return;
        }
        handleCopy(e);
        if (contentSelection.current.start !== contentSelection.current.end) {
          document.execCommand('delete');
        }
      },
      [handleCopy],
    );

    const handlePaste = useCallback(
      (e) => {
        if (e.isDefaultPrevented() || !divRef.current || !contentSelection.current) {
          return;
        }
        e.preventDefault();
        const clipboardData = e.clipboardData;
        const text = clipboardData.getData('text/plain');
        insertText(e, text);
      },
      [insertText],
    );

    const startComposition = useCallback(() => {
      compositionRef.current = true;
    }, []);

    const endComposition = useCallback(
      (e) => {
        compositionRef.current = false;
        handleOnChangeText(e);
      },
      [handleOnChangeText],
    );

    const setRef = (currentRef: HTMLDivElement | null) => {
      const r = currentRef;
      if (r) {
        (r as unknown as TextInput).isFocused = () => document.activeElement === r;
        (r as unknown as TextInput).clear = () => {
          r.textContent = '';
          updateTextColor(r, '');
        };

        if (value === '' || value === undefined) {
          // update to placeholder color when value is empty
          updateTextColor(r, r.textContent ?? '');
        }
      }

      if (ref) {
        if (typeof ref === 'object') {
          // eslint-disable-next-line no-param-reassign
          (ref as MutableRefObject<HTMLDivElement | null>).current = r;
        } else if (typeof ref === 'function') {
          (ref as (elementRef: HTMLDivElement | null) => void)(r);
        }
      }
      divRef.current = r as MarkdownTextInputElement;
    };

    useClientEffect(
      function parseAndStyleValue() {
        if (!divRef.current || value === divRef.current.value) {
          return;
        }

        if (value === undefined) {
          parseText(divRef.current, divRef.current.value, processedMarkdownStyle);
          return;
        }
        const normalizedValue = normalizeValue(value);
        divRef.current.value = normalizedValue;
        parseText(divRef.current, normalizedValue, processedMarkdownStyle);
        updateTextColor(divRef.current, value);
      },
      [multiline, processedMarkdownStyle, value],
    );

    useClientEffect(
      function adjustHeight() {
        if (!divRef.current || !multiline) {
          return;
        }
        const elementHeight = getElementHeight(divRef.current, inputStyles, numberOfLines);
        divRef.current.style.height = elementHeight;
        divRef.current.style.maxHeight = elementHeight;
      },
      [numberOfLines],
    );

    useEffect(() => {
      if (!divRef.current) {
        return;
      }
      // focus the input on mount if autoFocus is set
      if (autoFocus) {
        divRef.current.focus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      // update content size when the input styles change
      handleContentSizeChange();
    }, [handleContentSizeChange, inputStyles]);

    useEffect(() => {
      if (!divRef.current || !selection || (contentSelection.current && selection.start === contentSelection.current.start && selection.end === contentSelection.current.end)) {
        return;
      }
      const newSelection: Selection = {start: selection.start, end: selection.end ?? selection.start};
      contentSelection.current = newSelection;
      updateRefSelectionVariables(newSelection);
      setCursorPosition(divRef.current, newSelection.start, newSelection.end);
    }, [selection, updateRefSelectionVariables]);

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        id={id}
        ref={setRef}
        contentEditable={!disabled}
        style={inputStyles}
        role={accessibilityRole || 'textbox'}
        aria-label={accessibilityLabel}
        aria-labelledby={`${accessibilityLabelledBy}`}
        aria-placeholder={heightSafePlaceholder}
        aria-multiline={multiline}
        autoCorrect={autoCorrect ? 'on' : 'off'}
        autoCapitalize={autoCapitalize}
        className={className}
        onKeyDown={handleKeyPress}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
        onInput={handleOnChangeText}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onCopy={handleCopy}
        onCut={handleCut}
        onPaste={handlePaste}
        placeholder={heightSafePlaceholder}
        spellCheck={spellCheck}
        dir={dir}
        inputMode={inputMode}
        onSelect={updateSelection}
      />
    );
  },
);

const styles = StyleSheet.create({
  defaultInputStyles: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: 'sans-serif',
    // @ts-expect-error it works on web
    boxSizing: 'border-box',
    whiteSpace: 'pre-wrap',
    overflowY: 'auto',
    overflowX: 'auto',
    overflowWrap: 'break-word',
  },
  disabledInputStyles: {
    opacity: 0.75,
    cursor: 'auto',
  },
});

export default MarkdownTextInput;

export type {MarkdownTextInputProps, MarkdownTextInputElement, HTMLMarkdownElement};
