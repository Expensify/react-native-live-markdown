/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#pragma once

#include <fbjni/fbjni.h>
#include <jsi/jsi.h>

using namespace facebook;

namespace expensify {
namespace livemarkdown {

  class MarkdownParser : public jni::HybridClass<MarkdownParser>,
                        public jsi::HostObject {
  public:
    static constexpr auto kJavaDescriptor =
        "Lcom/expensify/livemarkdown/MarkdownParser;";

    static jni::local_ref<jni::JString> nativeParse(
        jni::alias_ref<jhybridobject> jThis,
        jni::alias_ref<jni::JString> text,
        const int parserId);

    static void registerNatives();

  private:
    friend HybridBase;
  };

} // namespace livemarkdown
} // namespace expensify
