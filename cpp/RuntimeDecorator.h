#pragma once

#include <jsi/jsi.h>

using namespace facebook;

namespace expensify {
namespace livemarkdown {

void injectJSIBindings(jsi::Runtime &rt);

} // namespace livemarkdown
} // namespace expensify
