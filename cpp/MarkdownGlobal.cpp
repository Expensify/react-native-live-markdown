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

std::unordered_map<int, std::shared_ptr<SerializableWorklet>> globalMarkdownShareableWorklets;
std::mutex globalMarkdownShareableWorkletsMutex;

void registerMarkdownWorklet(const int parserId, const std::shared_ptr<SerializableWorklet> &markdownWorklet) {
  assert(markdownWorklet != nullptr);
  std::unique_lock<std::mutex> lock(globalMarkdownShareableWorkletsMutex);
  globalMarkdownShareableWorklets[parserId] = markdownWorklet;
}

void unregisterMarkdownWorklet(const int parserId) {
  std::unique_lock<std::mutex> lock(globalMarkdownShareableWorkletsMutex);
  globalMarkdownShareableWorklets.erase(parserId);
}

std::shared_ptr<SerializableWorklet> findMarkdownWorklet(const int parserId) {
  std::unique_lock<std::mutex> lock(globalMarkdownShareableWorkletsMutex);
  const auto it = globalMarkdownShareableWorklets.find(parserId);
  return it == globalMarkdownShareableWorklets.end() ? nullptr : it->second;
}

} // namespace livemarkdown
} // namespace expensify
