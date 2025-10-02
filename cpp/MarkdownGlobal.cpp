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

#ifdef IS_WORKLETS
std::unordered_map<int, std::shared_ptr<SerializableWorklet>> globalMarkdownShareableWorklets;
#else
std::unordered_map<int, std::shared_ptr<ShareableWorklet>> globalMarkdownShareableWorklets;
#endif
std::mutex globalMarkdownShareableWorkletsMutex;
int nextParserId = 1;

#ifdef IS_WORKLETS
const int registerMarkdownWorklet(const std::shared_ptr<SerializableWorklet> &markdownWorklet) {
#else
const int registerMarkdownWorklet(const std::shared_ptr<ShareableWorklet> &markdownWorklet) {
#endif
  assert(markdownWorklet != nullptr);
  auto parserId = nextParserId++;
  std::unique_lock<std::mutex> lock(globalMarkdownShareableWorkletsMutex);
  globalMarkdownShareableWorklets[parserId] = markdownWorklet;
  return parserId;
}

void unregisterMarkdownWorklet(const int parserId) {
  std::unique_lock<std::mutex> lock(globalMarkdownShareableWorkletsMutex);
  globalMarkdownShareableWorklets.erase(parserId);
}

#ifdef IS_WORKLETS
std::shared_ptr<SerializableWorklet> getMarkdownWorklet(const int parserId) {
#else
std::shared_ptr<ShareableWorklet> getMarkdownWorklet(const int parserId) {
#endif
  std::unique_lock<std::mutex> lock(globalMarkdownShareableWorkletsMutex);
  return globalMarkdownShareableWorklets.at(parserId);
}

} // namespace livemarkdown
} // namespace expensify
