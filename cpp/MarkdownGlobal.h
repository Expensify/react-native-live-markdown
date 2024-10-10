#pragma once

#include <jsi/jsi.h>

#include <worklets/WorkletRuntime/WorkletRuntime.h>

using namespace facebook;
using namespace worklets;

namespace expensify {
namespace livemarkdown {

void setMarkdownRuntime(const std::shared_ptr<WorkletRuntime> &markdownWorkletRuntime);

std::shared_ptr<WorkletRuntime> getMarkdownRuntime();

const int registerMarkdownWorklet(const std::shared_ptr<ShareableWorklet> &markdownWorklet);

void unregisterMarkdownWorklet(const int parserId);

std::shared_ptr<ShareableWorklet> getMarkdownWorklet(const int parserId);

} // namespace livemarkdown
} // namespace expensify
