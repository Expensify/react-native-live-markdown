#pragma once

#include <react/renderer/core/Props.h>
#include <react/renderer/core/ShadowNode.h>
#include <react/renderer/core/ShadowNodeFragment.h>
#include <react/renderer/core/State.h>

using namespace facebook::react;

namespace expensify {
namespace livemarkdown {

struct OwningShadowNodeFragment {
  Props::Shared props;
  ShadowNode::SharedListOfShared children;
  State::Shared state;

  operator ShadowNodeFragment() const {
    return ShadowNodeFragment {
      .props = props,
      .children = children,
      .state = state
    };
  }
};

} // namespace livemarkdown
} // namespace expensify
