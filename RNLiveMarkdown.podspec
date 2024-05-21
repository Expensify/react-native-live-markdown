require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "RNLiveMarkdown"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://github.com/expensify/react-native-live-markdown.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"

  s.resources = "parser/react-native-live-markdown-parser.js"

  install_modules_dependencies(s)

  if ENV['USE_FRAMEWORKS'] && ENV['RCT_NEW_ARCH_ENABLED']
    add_dependency(s, "React-Fabric", :additional_framework_paths => [
      "react/renderer/textlayoutmanager/platform/ios",
      "react/renderer/components/textinput/iostextinput",
    ])
  end

  s.subspec "common" do |ss|
    ss.source_files         = "cpp/**/*.{cpp,h}"
    ss.header_dir           = "RNLiveMarkdown"
  end
end
