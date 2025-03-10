require "json"

react_native_node_modules_dir = ENV['REACT_NATIVE_NODE_MODULES_DIR'] || File.join(File.dirname(`cd "#{Pod::Config.instance.installation_root.to_s}" && node --print "require.resolve('react-native/package.json')"`), '..')
react_native_json = JSON.parse(File.read(File.join(react_native_node_modules_dir, 'react-native/package.json')))
react_native_minor_version = react_native_json['version'].split('.')[1].to_i

pods_root = Pod::Config.instance.project_pods_root
react_native_reanimated_node_modules_dir = ENV['REACT_NATIVE_REANIMATED_NODE_MODULES_DIR'] || File.dirname(`cd "#{Pod::Config.instance.installation_root.to_s}" && node --print "require.resolve('react-native-reanimated/package.json')"`)
react_native_reanimated_node_modules_dir_from_pods_root = Pathname.new(react_native_reanimated_node_modules_dir).relative_path_from(pods_root).to_s

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "RNLiveMarkdown"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0", :visionos => "1.0" }
  s.source       = { :git => "https://github.com/expensify/react-native-live-markdown.git", :tag => "#{s.version}" }

  s.source_files = "apple/**/*.{h,m,mm}", "cpp/**/*.{h,cpp}"

  s.dependency "RNReanimated/worklets"

  s.xcconfig = {
    "OTHER_CFLAGS" => "$(inherited) -DREACT_NATIVE_MINOR_VERSION=#{react_native_minor_version}",
    "HEADER_SEARCH_PATHS" => [
      "\"$(PODS_ROOT)/#{react_native_reanimated_node_modules_dir_from_pods_root}/apple\"",
      "\"$(PODS_ROOT)/#{react_native_reanimated_node_modules_dir_from_pods_root}/Common/cpp\"",
    ].join(' '),
  }

  install_modules_dependencies(s)

  if ENV['USE_FRAMEWORKS'] != nil
    add_dependency(s, "React-FabricComponents", :additional_framework_paths => [
      "react/renderer/textlayoutmanager/platform/ios",
      "react/renderer/components/textinput/platform/ios",
    ])
    add_dependency(s, "React-rendererconsistency")
  end
end
