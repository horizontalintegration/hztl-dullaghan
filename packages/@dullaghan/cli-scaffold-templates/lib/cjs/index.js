"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jssStorybookTemplate = exports.jssMockDataTemplate = exports.jssJestTemplate = exports.jssAuthorableComponent = exports.reactComponent = void 0;
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
