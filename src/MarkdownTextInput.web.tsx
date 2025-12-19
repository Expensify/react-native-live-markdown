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
  GestureResponderEvent,
} from 'react-native';
import React, {useEffect, useRef, useCallback, useMemo, useLayoutEffect} from 'react';
import type {CSSProperties, MutableRefObject, ReactEventHandler, FocusEventHandler, MouseEvent, KeyboardEvent, SyntheticEvent, ClipboardEventHandler, TouchEvent} from 'react';
import {StyleSheet, TextInput as RNTextInput} from 'react-native';
import {updateInputStructure} from './web/utils/parserUtils';
import InputHistory from './web/InputHistory';
import type {TreeNode} from './web/utils/treeUtils';
import {getCurrentCursorPosition, removeSelection, setCursorPosition} from './web/utils/cursorUtils';
import './web/MarkdownTextInput.css';
import type {MarkdownStyle} from './MarkdownTextInputDecoratorViewNativeComponent';
import {getElementHeight, getPlaceholderValue, isEventComposing, normalizeValue, parseInnerHTMLToText} from './web/utils/inputUtils';
import {idGenerator, parseToReactDOMStyle, processMarkdownStyle} from './web/utils/webStyleUtils';
import {forceRefreshAllImages} from './web/inputElements/inlineImage';
import type {MarkdownRange, InlineImagesInputProps} from './commonTypes';

const useClientEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface MarkdownTextInputProps extends TextInputProps, InlineImagesInputProps {
  markdownStyle?: MarkdownStyle;
  parser: (text: string) => MarkdownRange[];
  formatSelection?: (text: string, selectionStart: number, selectionEnd: number, formatCommand: string) => FormatSelectionResult;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  dir?: string;
  disabled?: boolean;
}

interface MarkdownNativeEvent extends Event {
  inputType?: string;
  isComposing?: boolean;
  keyCode?: number;
}

type MarkdownTextInput = TextInput & React.Component<MarkdownTextInputProps>;

type Selection = {
  start: number;
  end: number;
};

type Dimensions = {
  width: number;
  height: number;
};

type FormatSelectionResult = {
  updatedText: string;
  cursorOffset: number;
};

type ParseTextResult = {
  text: string;
  cursorPosition: number | null;
};

let focusTimeout: NodeJS.Timeout | null = null;

type MarkdownTextInputElement = HTMLDivElement &
  HTMLInputElement & {
    tree: TreeNode;
    uniqueId: string;
    selection: Selection;
    imageElements: HTMLImageElement[];
  };

type HTMLMarkdownElement = HTMLElement & {
  value: string;
};

const MarkdownTextInput = React.forwardRef<MarkdownTextInput, MarkdownTextInputProps>(
  (
    {
      accessibilityLabel,
      accessibilityLabelledBy,
      accessibilityRole,
      autoCapitalize = 'sentences',
      autoCorrect = true,
      blurOnSubmit = false,
      submitBehavior,
      caretHidden,
      clearTextOnFocus,
      dir = 'auto',
      disabled = false,
      numberOfLines,
      multiline = false,
      markdownStyle,
      parser,
      formatSelection,
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
      onTouchStart,
      maxLength,
      addAuthTokenToImageURLCallback,
      imagePreviewAuthRequiredURLs,
    },
    ref,
  ) => {
    if (parser === undefined) {
      throw new Error('[react-native-live-markdown] `parser` is undefined');
    }
    if (typeof parser !== 'function') {
      throw new Error('[react-native-live-markdown] `parser` is not a function');
    }

    const divRef = useRef<MarkdownTextInputElement | null>(null);
    const currentlyFocusedField = useRef<HTMLDivElement | null>(null);
    const contentSelection = useRef<Selection | null>(null);
    const className = `react-native-live-markdown-input-${multiline ? 'multiline' : 'singleline'}`;
    const history = useRef<InputHistory | null>(null);
    const dimensions = useRef<Dimensions | null>(null);
    const pasteContent = useRef<string | null>(null);
    const hasJustBeenFocused = useRef<boolean>(false);

    if (!history.current) {
      history.current = new InputHistory(100, 150, value || '');
    }

    const flattenedStyle = useMemo(() => StyleSheet.flatten(style), [style]);
    // Using JSON.stringify(flattenedMarkdownStyle) as a simple styles object hash to avoid rerenders when not memoized markdownStyle is passed
    const hashedMarkdownStyle = useMemo(() => JSON.stringify(StyleSheet.flatten(markdownStyle)), [markdownStyle]);

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
        parserFunction: (input: string) => MarkdownRange[],
        target: MarkdownTextInputElement,
        text: string | null,
        customMarkdownStyles: MarkdownStyle,
        cursorPosition: number | null = null,
        shouldAddToHistory = true,
        shouldForceDOMUpdate = false,
        shouldScrollIntoView = false,
      ): ParseTextResult => {
        if (!divRef.current) {
          return {text: text || '', cursorPosition: null};
        }

        if (text === null) {
          return {text: divRef.current.value, cursorPosition: null};
        }
        const parsedText = updateInputStructure(parserFunction, target, text, cursorPosition, multiline, customMarkdownStyles, false, shouldForceDOMUpdate, shouldScrollIntoView, {
          addAuthTokenToImageURLCallback,
          imagePreviewAuthRequiredURLs,
        });
        divRef.current.value = parsedText.text;

        if (history.current && shouldAddToHistory) {
          history.current.throttledAdd(parsedText.text, parsedText.cursorPosition);
        }

        return parsedText;
      },
      [addAuthTokenToImageURLCallback, imagePreviewAuthRequiredURLs, multiline],
    );

    const processedMarkdownStyle = useMemo(() => {
      const newMarkdownStyle = processMarkdownStyle(markdownStyle);
      if (divRef.current) {
        parseText(parser, divRef.current, divRef.current.value, newMarkdownStyle, null, false, false);
      }
      return newMarkdownStyle;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hashedMarkdownStyle, parser, parseText]);

    const inputStyles = useMemo(
      () =>
        StyleSheet.flatten([
          styles.defaultInputStyles,
          flattenedStyle && {
            caretColor: (flattenedStyle as TextStyle).color || 'black',
          },
          {whiteSpace: multiline ? 'pre-wrap' : 'pre'},
          disabled && styles.disabledInputStyles,
          parseToReactDOMStyle(flattenedStyle),
          caretHidden && styles.caretHidden,
        ]) as CSSProperties,
      [flattenedStyle, multiline, disabled, caretHidden],
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
        return parseText(parser, target, undoValue, processedMarkdownStyle, item ? item.cursorPosition : null, false);
      },
      [parser, parseText, processedMarkdownStyle],
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
        return parseText(parser, target, redoValue, processedMarkdownStyle, item ? item.cursorPosition : null, false);
      },
      [parser, parseText, processedMarkdownStyle],
    );

    const handleFormatSelection = useCallback(
      (target: MarkdownTextInputElement, parsedText: string, cursorPosition: number, formatCommand: string): ParseTextResult => {
        if (!contentSelection.current || contentSelection.current.end - contentSelection.current.start < 1) {
          throw new Error('[react-native-live-markdown] Trying to apply format command on empty selection');
        }

        if (!formatSelection) {
          return parseText(parser, target, parsedText, processedMarkdownStyle, cursorPosition);
        }

        const {updatedText, cursorOffset} = formatSelection(parsedText, contentSelection.current.start, contentSelection.current.end, formatCommand);
        return parseText(parser, target, updatedText, processedMarkdownStyle, cursorPosition + cursorOffset, true);
      },
      [parser, parseText, formatSelection, processedMarkdownStyle],
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

    const handleOnSelect = useCallback(
      (e: React.SyntheticEvent<HTMLDivElement>) => {
        updateSelection(e);

        // If the input has just been focused, we need to scroll the cursor into view
        if (divRef.current && contentSelection.current && hasJustBeenFocused.current) {
          setCursorPosition(divRef.current, contentSelection.current?.start, contentSelection.current?.end, true);
          hasJustBeenFocused.current = false;
        }
      },
      [updateSelection],
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
        const isComposing = isEventComposing(nativeEvent);

        updateTextColor(divRef.current, e.target.textContent ?? '');
        const previousText = divRef.current.value;
        let parsedText = normalizeValue(
          inputType === 'pasteText' ? pasteContent.current || '' : parseInnerHTMLToText(e.target as MarkdownTextInputElement, contentSelection.current.start, inputType, multiline),
        );

        if (pasteContent.current) {
          pasteContent.current = null;
        }

        if (maxLength !== undefined && parsedText.length > maxLength) {
          parsedText = previousText;
        }

        const prevSelection = contentSelection.current ?? {start: 0, end: 0};
        const newCursorPosition =
          inputType === 'deleteContentForward' && contentSelection.current.start === contentSelection.current.end
            ? Math.max(contentSelection.current.start, 0) // Don't move the caret when deleting forward with no characters selected
            : Math.max(Math.max(contentSelection.current.end, 0) + (parsedText.length - previousText.length), 0);

        if (isComposing) {
          updateTextColor(divRef.current, parsedText);
          updateSelection(e, {
            start: newCursorPosition,
            end: newCursorPosition,
          });
          divRef.current.value = parsedText;
          if (onChangeText) {
            onChangeText(parsedText);
          }
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
          case 'formatBold':
          case 'formatItalic':
          case 'formatUnderline':
            newInputUpdate = handleFormatSelection(divRef.current, parsedText, newCursorPosition, inputType);
            break;
          default:
            newInputUpdate = parseText(parser, divRef.current, parsedText, processedMarkdownStyle, newCursorPosition, true, !inputType, inputType === 'pasteText');
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
      [
        updateTextColor,
        multiline,
        maxLength,
        updateSelection,
        onChange,
        onChangeText,
        handleContentSizeChange,
        undo,
        redo,
        handleFormatSelection,
        parseText,
        parser,
        processedMarkdownStyle,
        setEventProps,
      ],
    );

    const insertText = useCallback(
      (e: SyntheticEvent<HTMLDivElement, Event>, text: string) => {
        if (!contentSelection.current || !divRef.current) {
          return;
        }

        const previousText = divRef.current.value;
        let insertedText = text;
        let availableLength = text.length;
        const prefix = divRef.current.value.substring(0, contentSelection.current.start);
        const suffix = divRef.current.value.substring(contentSelection.current.end);
        if (maxLength !== undefined) {
          availableLength = maxLength - prefix.length - suffix.length;
          insertedText = text.slice(0, Math.max(availableLength, 0));
        }
        const newText = `${prefix}${insertedText}${suffix}`;
        if (previousText === newText) {
          document.execCommand('delete');
        }

        pasteContent.current = availableLength > 0 ? newText : previousText;
        (e.nativeEvent as MarkdownNativeEvent).inputType = 'pasteText';

        handleOnChangeText(e);
      },
      [handleOnChangeText, maxLength],
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

        // Support submitBehavior prop (React Native 0.73+), fallback to blurOnSubmit for backwards compatibility
        let shouldBlurOnSubmit;
        let shouldSubmit;
        if (submitBehavior != null) {
          // submitBehavior takes precedence over blurOnSubmit
          shouldSubmit = submitBehavior === 'submit' || submitBehavior === 'blurAndSubmit';
          shouldBlurOnSubmit = submitBehavior === 'blurAndSubmit';
        } else {
          // Fallback to blurOnSubmit logic for backwards compatibility
          const blurOnSubmitDefault = !multiline;
          shouldBlurOnSubmit = blurOnSubmit === null ? blurOnSubmitDefault : blurOnSubmit;
          shouldSubmit = blurOnSubmit || !multiline;
        }
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
          // submitBehavior === 'newline' means don't submit, just insert newline (default behavior)
          if (!e.shiftKey && shouldSubmit && onSubmitEditing) {
            onSubmitEditing(event as unknown as NativeSyntheticEvent<TextInputSubmitEditingEventData>);
          } else if (multiline && (!shouldSubmit || e.shiftKey)) {
            //   We need to change normal behavior of "Enter" key to insert a line breaks, to prevent wrapping contentEditable text in <div> tags.
            //  Thanks to that in every situation we have proper amount of new lines in our parsed text. Without it pressing enter in empty lines will add 2 more new lines.
            insertText(e, '\n');
          }
          if (!e.shiftKey && shouldBlurOnSubmit && hostNode !== null) {
            setTimeout(() => divRef.current && divRef.current.blur(), 0);
          }
        }
      },
      [multiline, blurOnSubmit, submitBehavior, setEventProps, onKeyPress, handleOnChangeText, onSubmitEditing, insertText],
    );

    const handleFocus: FocusEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        hasJustBeenFocused.current = true;
        const e = event as unknown as NativeSyntheticEvent<TextInputFocusEventData>;
        RNTextInput.State.focusTextInput?.(e.target);
        const hostNode = e.target as unknown as HTMLDivElement;
        currentlyFocusedField.current = hostNode;
        setEventProps(e);
        if (divRef.current) {
          if (contentSelection.current) {
            setCursorPosition(divRef.current, contentSelection.current.start, contentSelection.current.end);
          } else {
            const valueLength = value ? value.length : (divRef.current.value || '').length;
            setCursorPosition(divRef.current, valueLength, null);
          }
        }

        if (divRef.current) {
          divRef.current.scrollIntoView({
            block: 'nearest',
          });
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
        if (event.target !== document.activeElement) {
          RNTextInput.State.blurTextInput?.(e.target);
        }
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
      (e: React.ClipboardEvent<HTMLDivElement>) => {
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
      (e: React.ClipboardEvent<HTMLDivElement>) => {
        if (e.isDefaultPrevented() || !divRef.current || !contentSelection.current) {
          return;
        }
        e.preventDefault();
        const clipboardData = e.clipboardData;
        const text = clipboardData.getData('text/plain').trim() || clipboardData.getData('text/uri-list').trim();
        insertText(e, text);
      },
      [insertText],
    );

    const endComposition = useCallback(
      (e: React.CompositionEvent<HTMLDivElement>) => {
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

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
      if (!onTouchStart) {
        return;
      }
      const e = event as unknown as GestureResponderEvent;
      onTouchStart(e);
    };

    useClientEffect(
      function parseAndStyleValue() {
        if (!divRef.current || value === divRef.current.value) {
          return;
        }

        if (value === undefined) {
          parseText(parser, divRef.current, divRef.current.value, processedMarkdownStyle);
          return;
        }
        const normalizedValue = normalizeValue(value);

        divRef.current.value = normalizedValue;
        parseText(parser, divRef.current, normalizedValue, processedMarkdownStyle, null, true, false, true);

        updateTextColor(divRef.current, value);
      },
      [parser, multiline, processedMarkdownStyle, value, maxLength],
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
      divRef.current.uniqueId = idGenerator.next().value as string;
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

    useEffect(() => {
      const handleReconnect = () => {
        forceRefreshAllImages(divRef.current as MarkdownTextInputElement, processedMarkdownStyle);
      };

      window.addEventListener('online', handleReconnect);
      return () => {
        window.removeEventListener('online', handleReconnect);
      };
    }, [processedMarkdownStyle]);

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
        onCompositionEnd={endComposition}
        onInput={handleOnChangeText}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onCopy={handleCopy}
        onCut={handleCut}
        onPaste={handlePaste}
        // @ts-expect-error: we use placeholder prop to style it in CSS even though its not handled internally
        placeholder={heightSafePlaceholder}
        spellCheck={spellCheck}
        dir={dir}
        inputMode={inputMode}
        onSelect={handleOnSelect}
        onTouchStart={handleTouchStart}
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
    boxSizing: 'border-box',
    // @ts-expect-error it works on web
    overflowY: 'auto',
    overflowX: 'auto',
    overflowWrap: 'break-word',
  },
  disabledInputStyles: {
    opacity: 0.75,
    cursor: 'auto',
  },
  caretHidden: {
    // @ts-expect-error it works on web
    caretColor: 'transparent',
  },
});

export default MarkdownTextInput;

export type {MarkdownNativeEvent, MarkdownTextInputProps, MarkdownTextInputElement, HTMLMarkdownElement};

function getWorkletRuntime() {
  throw new Error('[react-native-live-markdown] `getWorkletRuntime` is not available on web. Please make sure to use it only on native Android or iOS.');
}

export {getWorkletRuntime};
