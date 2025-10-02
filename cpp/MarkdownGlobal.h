#pragma once

#include <jsi/jsi.h>

#include <worklets/WorkletRuntime/WorkletRuntime.h>

using namespace facebook;
using namespace worklets;

namespace expensify {
namespace livemarkdown {

void setMarkdownRuntime(const std::shared_ptr<WorkletRuntime> &markdownWorkletRuntime);

std::shared_ptr<WorkletRuntime> getMarkdownRuntime();

#ifdef IS_WORKLETS
const int registerMarkdownWorklet(const std::shared_ptr<SerializableWorklet> &markdownWorklet);
#else
const int registerMarkdownWorklet(const std::shared_ptr<ShareableWorklet> &markdownWorklet);
#endif

void unregisterMarkdownWorklet(const int parserId);

#ifdef IS_WORKLETS
std::shared_ptr<SerializableWorklet> getMarkdownWorklet(const int parserId);
#else
const int registerMarkdownWorklet(const std::shared_ptr<ShareableWorklet> &markdownWorklet);
#endif

} // namespace livemarkdown
} // namespace expensify
