#include "MarkdownGlobal.h"

#include <unordered_map>

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

std::unordered_map<int, std::shared_ptr<ShareableWorklet>> globalMarkdownShareableWorklets;
int nextParserId = 1;

const int registerMarkdownWorklet(const std::shared_ptr<ShareableWorklet> &markdownWorklet) {
  auto parserId = nextParserId++;
  globalMarkdownShareableWorklets[parserId] = markdownWorklet;
  return parserId;
}

void unregisterMarkdownWorklet(const int parserId) {
  globalMarkdownShareableWorklets.erase(parserId);
}

std::shared_ptr<ShareableWorklet> getMarkdownWorklet(const int parserId) {
  const auto &worklet = globalMarkdownShareableWorklets[parserId];
  assert(worklet != nullptr);
  return worklet;
}

} // namespace livemarkdown
} // namespace expensify
