"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportString = exports.hasChoice = exports.jssScaffoldOpts = exports.jssStorybookTemplate = exports.jssMockDataTemplate = exports.jssJestTemplate = exports.jssAuthorableComponent = exports.reactComponent = void 0;
// React
var react_component_js_1 = require("./templates/react/react-component.js");
Object.defineProperty(exports, "reactComponent", { enumerable: true, get: function () { return react_component_js_1.reactComponent; } });
var authorable_component_js_1 = require("./templates/jss/authorable-component.js");
Object.defineProperty(exports, "jssAuthorableComponent", { enumerable: true, get: function () { return authorable_component_js_1.jssAuthorableComponent; } });
var jest_js_1 = require("./templates/jss/jest.js");
Object.defineProperty(exports, "jssJestTemplate", { enumerable: true, get: function () { return jest_js_1.jssJestTemplate; } });
var mock_data_js_1 = require("./templates/jss/mock-data.js");
Object.defineProperty(exports, "jssMockDataTemplate", { enumerable: true, get: function () { return mock_data_js_1.jssMockDataTemplate; } });
var storybook_js_1 = require("./templates/jss/storybook.js");
Object.defineProperty(exports, "jssStorybookTemplate", { enumerable: true, get: function () { return storybook_js_1.jssStorybookTemplate; } });
var jss_scaffold_opts_1 = require("./templates/jss/jss-scaffold-opts");
Object.defineProperty(exports, "jssScaffoldOpts", { enumerable: true, get: function () { return jss_scaffold_opts_1.jssScaffoldOpts; } });
// Utilities
var has_choice_1 = require("./utils/has-choice");
Object.defineProperty(exports, "hasChoice", { enumerable: true, get: function () { return has_choice_1.hasChoice; } });
var get_import_string_1 = require("./utils/get-import-string");
Object.defineProperty(exports, "getImportString", { enumerable: true, get: function () { return get_import_string_1.getImportString; } });
