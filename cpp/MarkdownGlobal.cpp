#include "MarkdownGlobal.h"

using namespace facebook;

namespace expensify {
namespace livemarkdown {

std::shared_ptr<WorkletRuntime> globalMarkdownWorkletRuntime;

void setMarkdownRuntime(const std::shared_ptr<WorkletRuntime> &markdownWorkletRuntime) {
  globalMarkdownWorkletRuntime = markdownWorkletRuntime;
}

std::shared_ptr<WorkletRuntime> getMarkdownRuntime() {
  return globalMarkdownWorkletRuntime;
}

std::shared_ptr<ShareableWorklet> globalMarkdownShareableWorklet;

void setMarkdownWorklet(const std::shared_ptr<ShareableWorklet> &markdownWorklet) {
  globalMarkdownShareableWorklet = markdownWorklet;
}

std::shared_ptr<ShareableWorklet> getMarkdownWorklet() {
  return globalMarkdownShareableWorklet;
}

} // namespace livemarkdown
} // namespace expensify
