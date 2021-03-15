"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReleasePublished = exports.onPullRequestLabeled = exports.onPullRequestOpened = exports.onIssuesLabeled = exports.onIssuesOpened = void 0;
var google_translate_api_1 = __importDefault(require("@vitalets/google-translate-api"));
var axios_1 = __importDefault(require("axios"));
var lodash_1 = require("lodash");
var utils_1 = require("./utils");
function onIssuesOpened(context) {
    return __awaiter(this, void 0, void 0, function () {
        var config, isValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getConfig(context)];
                case 1:
                    config = _a.sent();
                    if (!config)
                        return [2 /*return*/];
                    return [4 /*yield*/, validIssue(context, config)];
                case 2:
                    isValid = _a.sent();
                    if (!isValid) return [3 /*break*/, 5];
                    return [4 /*yield*/, addLabels(context, false)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, translateIssue(context, config)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.onIssuesOpened = onIssuesOpened;
function onIssuesLabeled(context) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getConfig(context)];
                case 1:
                    config = _a.sent();
                    if (!config)
                        return [2 /*return*/];
                    return [4 /*yield*/, replyLabeled(context, config)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, assignOwner(context, config)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.onIssuesLabeled = onIssuesLabeled;
function onPullRequestOpened(context) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getConfig(context)];
                case 1:
                    config = _a.sent();
                    if (!config)
                        return [2 /*return*/];
                    return [4 /*yield*/, commentPreview(context, config)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, addLabels(context, true)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.onPullRequestOpened = onPullRequestOpened;
function onPullRequestLabeled(context) {
    return __awaiter(this, void 0, void 0, function () {
        var config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.getConfig(context)];
                case 1:
                    config = _a.sent();
                    if (!config)
                        return [2 /*return*/];
                    return [4 /*yield*/, assignOwner(context, config)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.onPullRequestLabeled = onPullRequestLabeled;
function onReleasePublished(context) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sendReleaseInfo(context)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.onReleasePublished = onReleasePublished;
function validIssue(context, config) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, mark, labels, replay, member, _b, body, number, user, comment, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = config.issue.invalid, mark = _a.mark, labels = _a.labels, replay = _a.replay;
                    labels = Array.isArray(labels) ? labels : [labels];
                    return [4 /*yield*/, utils_1.isMember(context)];
                case 1:
                    member = _c.sent();
                    _b = context.payload.issue, body = _b.body, number = _b.number, user = _b.user;
                    if (!(!body.includes(mark) && !member)) return [3 /*break*/, 8];
                    context.log.trace({ number: number }, 'replying Invalid issue...');
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 6, , 7]);
                    comment = context.issue({ body: utils_1.format(replay, { user: user.login }) });
                    return [4 /*yield*/, context.octokit.issues.createComment(comment)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, context.octokit.issues.update(context.issue({ state: 'closed' }))];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, context.octokit.issues.addLabels(context.issue({ labels: labels }))];
                case 5:
                    _c.sent();
                    context.log.info({ number: number }, 'replied invalid issue...');
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _c.sent();
                    context.log.error({ number: number, error: new Error(e_1) }, 'reply invalid issue error!');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, false];
                case 8: return [2 /*return*/, true];
            }
        });
    });
}
function addLabels(context, isPR) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, number, titleReg, titleMathResult, title_1, _b, module_1, _c, name, labels, e_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = context.payload.issue, title = _a.title, number = _a.number;
                    titleReg = isPR ? /\((.*)\)\:/ : /\[(.*)\]/;
                    titleMathResult = title.match(titleReg);
                    if (!titleMathResult) return [3 /*break*/, 4];
                    title_1 = titleMathResult[1];
                    _b = title_1.split(':').map(function (item) { return item.trim(); }), module_1 = _b[0], _c = _b[1], name = _c === void 0 ? '' : _c;
                    labels = void 0;
                    if (name.length > 0) {
                        labels = name.split(',').map(function (item) { return lodash_1.upperFirst(module_1) + ':' + lodash_1.upperFirst(item); });
                    }
                    else {
                        labels = [lodash_1.upperFirst(module_1)];
                    }
                    context.log.trace({ number: number, labels: labels }, 'adding issue label...');
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, context.octokit.issues.addLabels(context.issue({ labels: labels }))];
                case 2:
                    _d.sent();
                    context.log.info({ number: number, labels: labels }, 'added issue label.');
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _d.sent();
                    context.log.error({ number: number, labels: labels, error: new Error(e_2) }, 'add issue error!');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function translateIssue(context, config) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, mark, replay, _b, body, title, number, translateOptions, translatedTitle, placeholder_1, codeBlock, translatedBody, bodyText_1, content, comment, e_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = config.issue.translate, mark = _a.mark, replay = _a.replay;
                    _b = context.payload.issue, body = _b.body, title = _b.title, number = _b.number;
                    if (!body.includes(mark)) return [3 /*break*/, 6];
                    translateOptions = { from: 'zh-CN', to: 'en' };
                    return [4 /*yield*/, google_translate_api_1.default(title, translateOptions)];
                case 1:
                    translatedTitle = _c.sent();
                    placeholder_1 = '{{---}}';
                    codeBlock = body.match(/```([\s\S]*?)```/g);
                    return [4 /*yield*/, google_translate_api_1.default(body.replace(/```([\s\S]*?)```/g, placeholder_1).replace(/<!--(.*?)-->/g, ''), translateOptions)];
                case 2:
                    translatedBody = _c.sent();
                    if (!(translatedTitle.text && translatedBody.text)) return [3 /*break*/, 6];
                    bodyText_1 = translatedBody.text;
                    if (codeBlock) {
                        codeBlock.forEach(function (item) {
                            bodyText_1 = bodyText_1.replace(placeholder_1, item);
                        });
                    }
                    content = utils_1.format(replay, { title: translatedTitle.text, body: bodyText_1 });
                    comment = context.issue({ body: content });
                    context.log.trace({ number: number, comment: comment }, 'translating issue...');
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, context.octokit.issues.createComment(comment)];
                case 4:
                    _c.sent();
                    context.log.info({ number: number, comment: comment }, 'translated issue.');
                    return [3 /*break*/, 6];
                case 5:
                    e_3 = _c.sent();
                    context.log.error({ number: number, comment: comment, error: new Error(e_3) }, 'translate issue error!');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function replyLabeled(context, config) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, number, user, labelName, targetConfig, replay, extraLabel, comment, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = context.payload.issue, number = _a.number, user = _a.user;
                    labelName = context.payload.label.name;
                    targetConfig = config.issue.labeled.find(function (item) { return item.labels.includes(labelName); });
                    if (!targetConfig) return [3 /*break*/, 6];
                    context.log.trace({ number: number, labelName: labelName }, 'replying labeled...');
                    replay = targetConfig.replay, extraLabel = targetConfig.extraLabel;
                    comment = context.issue({ body: utils_1.format(replay, { user: user.login }) });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, context.octokit.issues.createComment(comment)];
                case 2:
                    _b.sent();
                    if (!extraLabel) return [3 /*break*/, 4];
                    return [4 /*yield*/, context.octokit.issues.addLabels(context.issue({ labels: [extraLabel] }))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    context.log.info({ number: number, labelName: labelName, comment: comment }, 'replied by label.');
                    return [3 /*break*/, 6];
                case 5:
                    e_4 = _b.sent();
                    context.log.error({ number: number, labelName: labelName, comment: comment, error: new Error(e_4) }, 'reply labeled error!');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function assignOwner(context, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, cdk, comp, pro, label, _c, packageName, _d, componentName, targetPackage, assigner, number, e_5;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = config.issue.owner, cdk = _b.cdk, comp = _b.comp, pro = _b.pro;
                    label = context.payload.label.name;
                    _c = label.split(':'), packageName = _c[0], _d = _c[1], componentName = _d === void 0 ? '' : _d;
                    targetPackage = {};
                    if (packageName === 'Cdk') {
                        targetPackage = cdk;
                    }
                    else if (packageName === 'Comp') {
                        targetPackage = comp;
                    }
                    else if (packageName === 'Pro') {
                        targetPackage = pro;
                    }
                    assigner = targetPackage[componentName] || targetPackage.def;
                    if (!assigner) {
                        return [2 /*return*/];
                    }
                    number = ((_a = context.payload.issue) === null || _a === void 0 ? void 0 : _a.number) || context.payload.number;
                    context.log.trace({ number: number, label: label }, 'assigning owner...');
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, context.octokit.issues.addAssignees(context.issue({ assignees: [assigner] }))];
                case 2:
                    _e.sent();
                    context.log.info({ number: number, assigner: assigner }, 'assigned owner.');
                    return [3 /*break*/, 4];
                case 3:
                    e_5 = _e.sent();
                    context.log.error({ number: number, assigner: assigner, error: new Error(e_5) }, 'assign owner error!');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function commentPreview(context, config) {
    return __awaiter(this, void 0, void 0, function () {
        var replay, number, comment, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    replay = config.pullRequest.preview.replay;
                    number = context.payload.number;
                    comment = context.issue({ body: utils_1.format(replay, { number: number }) });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, context.octokit.issues.createComment(comment)];
                case 2:
                    _a.sent();
                    context.log.trace({ number: number }, 'Comment preview url...');
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    context.log.error({ number: number, error: new Error(e_6) }, 'Comment preview error!');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function sendReleaseInfo(context) {
    return __awaiter(this, void 0, void 0, function () {
        var release;
        return __generator(this, function (_a) {
            release = context.payload.release;
            axios_1.default.post("https://oapi.dingtalk.com/robot/send?access_token=" + process.env.DINGTALK_TOKEN, {
                msgtype: 'markdown',
                markdown: {
                    title: release.name + " \u53D1\u5E03",
                    text: "# " + release.name + " \u53D1\u5E03\u65E5\u5FD7 \n\n " + release.body,
                },
            });
            return [2 /*return*/];
        });
    });
}
