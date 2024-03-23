#pragma once

#include <jsi/jsi.h>

#include "WorkletRuntime.h"

using namespace facebook;
using namespace reanimated;

namespace expensify {
namespace livemarkdown {

void setMarkdownRuntime(const std::shared_ptr<WorkletRuntime> &markdownWorkletRuntime);

std::shared_ptr<WorkletRuntime> getMarkdownRuntime();

void setMarkdownWorklet(const std::shared_ptr<ShareableWorklet> &markdownWorklet);

std::shared_ptr<ShareableWorklet> getMarkdownWorklet();

} // namespace livemarkdown
} // namespace expensify
