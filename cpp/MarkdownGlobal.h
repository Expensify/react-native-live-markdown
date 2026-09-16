#pragma once

#include <jsi/jsi.h>

#include <worklets/WorkletRuntime/WorkletRuntime.h>

using namespace facebook;
using namespace worklets;

namespace expensify {
namespace livemarkdown {

void setMarkdownRuntime(const std::shared_ptr<WorkletRuntime> &markdownWorkletRuntime);

std::shared_ptr<WorkletRuntime> getMarkdownRuntime();

// JS picks the id, one per parser worklet, so the decorator view can carry it
// in the same commit that registers the worklet.
void registerMarkdownWorklet(const int parserId, const std::shared_ptr<SerializableWorklet> &markdownWorklet);

void unregisterMarkdownWorklet(const int parserId);

// Returns nullptr when nothing is registered under `parserId`.
std::shared_ptr<SerializableWorklet> findMarkdownWorklet(const int parserId);

} // namespace livemarkdown
} // namespace expensify
