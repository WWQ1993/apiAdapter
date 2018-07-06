(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['../src/index.js', '../example/data'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('../src/index.js'), require('../example/data'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.index, global.data);
        global.indexSpec = mod.exports;
    }
})(this, function (_index, _data) {
    'use strict';

    var _data2 = _interopRequireDefault(_data);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _powerAssertVisitorKeys = '{"ArrayExpression":["elements"],"AssignmentExpression":["left","right"],"BinaryExpression":["left","right"],"Directive":["value"],"DirectiveLiteral":[],"BlockStatement":["directives","body"],"BreakStatement":["label"],"CallExpression":["callee","arguments"],"CatchClause":["param","body"],"ConditionalExpression":["test","consequent","alternate"],"ContinueStatement":["label"],"DebuggerStatement":[],"DoWhileStatement":["test","body"],"EmptyStatement":[],"ExpressionStatement":["expression"],"File":["program"],"ForInStatement":["left","right","body"],"ForStatement":["init","test","update","body"],"FunctionDeclaration":["id","params","body","returnType","typeParameters"],"FunctionExpression":["id","params","body","returnType","typeParameters"],"Identifier":["typeAnnotation"],"IfStatement":["test","consequent","alternate"],"LabeledStatement":["label","body"],"StringLiteral":[],"NumericLiteral":[],"NullLiteral":[],"BooleanLiteral":[],"RegExpLiteral":[],"LogicalExpression":["left","right"],"MemberExpression":["object","property"],"NewExpression":["callee","arguments"],"Program":["directives","body"],"ObjectExpression":["properties"],"ObjectMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectProperty":["key","value","decorators"],"RestElement":["argument","typeAnnotation"],"ReturnStatement":["argument"],"SequenceExpression":["expressions"],"SwitchCase":["test","consequent"],"SwitchStatement":["discriminant","cases"],"ThisExpression":[],"ThrowStatement":["argument"],"TryStatement":["block","handler","finalizer"],"UnaryExpression":["argument"],"UpdateExpression":["argument"],"VariableDeclaration":["declarations"],"VariableDeclarator":["id","init"],"WhileStatement":["test","body"],"WithStatement":["object","body"],"AssignmentPattern":["left","right"],"ArrayPattern":["elements","typeAnnotation"],"ArrowFunctionExpression":["params","body","returnType","typeParameters"],"ClassBody":["body"],"ClassDeclaration":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ClassExpression":["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],"ExportAllDeclaration":["source"],"ExportDefaultDeclaration":["declaration"],"ExportNamedDeclaration":["declaration","specifiers","source"],"ExportSpecifier":["local","exported"],"ForOfStatement":["left","right","body"],"ImportDeclaration":["specifiers","source"],"ImportDefaultSpecifier":["local"],"ImportNamespaceSpecifier":["local"],"ImportSpecifier":["local","imported"],"MetaProperty":["meta","property"],"ClassMethod":["key","params","body","decorators","returnType","typeParameters"],"ObjectPattern":["properties","typeAnnotation"],"SpreadElement":["argument"],"Super":[],"TaggedTemplateExpression":["tag","quasi"],"TemplateElement":[],"TemplateLiteral":["quasis","expressions"],"YieldExpression":["argument"],"AnyTypeAnnotation":[],"ArrayTypeAnnotation":["elementType"],"BooleanTypeAnnotation":[],"BooleanLiteralTypeAnnotation":[],"NullLiteralTypeAnnotation":[],"ClassImplements":["id","typeParameters"],"ClassProperty":["key","value","typeAnnotation","decorators"],"DeclareClass":["id","typeParameters","extends","body"],"DeclareFunction":["id"],"DeclareInterface":["id","typeParameters","extends","body"],"DeclareModule":["id","body"],"DeclareModuleExports":["typeAnnotation"],"DeclareTypeAlias":["id","typeParameters","right"],"DeclareOpaqueType":["id","typeParameters","supertype"],"DeclareVariable":["id"],"DeclareExportDeclaration":["declaration","specifiers","source"],"ExistentialTypeParam":[],"FunctionTypeAnnotation":["typeParameters","params","rest","returnType"],"FunctionTypeParam":["name","typeAnnotation"],"GenericTypeAnnotation":["id","typeParameters"],"InterfaceExtends":["id","typeParameters"],"InterfaceDeclaration":["id","typeParameters","extends","body"],"IntersectionTypeAnnotation":["types"],"MixedTypeAnnotation":[],"EmptyTypeAnnotation":[],"NullableTypeAnnotation":["typeAnnotation"],"NumericLiteralTypeAnnotation":[],"NumberTypeAnnotation":[],"StringLiteralTypeAnnotation":[],"StringTypeAnnotation":[],"ThisTypeAnnotation":[],"TupleTypeAnnotation":["types"],"TypeofTypeAnnotation":["argument"],"TypeAlias":["id","typeParameters","right"],"OpaqueType":["id","typeParameters","impltype","supertype"],"TypeAnnotation":["typeAnnotation"],"TypeCastExpression":["expression","typeAnnotation"],"TypeParameter":["bound"],"TypeParameterDeclaration":["params"],"TypeParameterInstantiation":["params"],"ObjectTypeAnnotation":["properties","indexers","callProperties"],"ObjectTypeCallProperty":["value"],"ObjectTypeIndexer":["id","key","value"],"ObjectTypeProperty":["key","value"],"ObjectTypeSpreadProperty":["argument"],"QualifiedTypeIdentifier":["id","qualification"],"UnionTypeAnnotation":["types"],"VoidTypeAnnotation":[],"JSXAttribute":["name","value"],"JSXClosingElement":["name"],"JSXElement":["openingElement","children","closingElement"],"JSXEmptyExpression":[],"JSXExpressionContainer":["expression"],"JSXSpreadChild":["expression"],"JSXIdentifier":[],"JSXMemberExpression":["object","property"],"JSXNamespacedName":["namespace","name"],"JSXOpeningElement":["name","attributes"],"JSXSpreadAttribute":["argument"],"JSXText":[],"Noop":[],"ParenthesizedExpression":["expression"],"AwaitExpression":["argument"],"ForAwaitStatement":["left","right","body"],"BindExpression":["object","callee"],"Import":[],"Decorator":["expression"],"DoExpression":["body"],"ExportDefaultSpecifier":["exported"],"ExportNamespaceSpecifier":["exported"],"RestProperty":["argument"],"SpreadProperty":["argument"]}',
        _powerAssertRecorder = function () {
        function PowerAssertRecorder() {
            this.captured = [];
        }

        PowerAssertRecorder.prototype._capt = function _capt(value, espath) {
            this.captured.push({
                value: value,
                espath: espath
            });
            return value;
        };

        PowerAssertRecorder.prototype._expr = function _expr(value, source) {
            var capturedValues = this.captured;
            this.captured = [];
            return {
                powerAssertContext: {
                    value: value,
                    events: capturedValues
                },
                source: source
            };
        };

        return PowerAssertRecorder;
    }();

    describe('index', function () {
        it('test index from a to b', function () {
            var _rec = new _powerAssertRecorder();

            var newData = new _index.DataAdapter(_data2.default, {
                index: [{
                    'from': 'attributes.id',
                    'to': 'id'
                }]
            });
            assert(_rec._expr(_rec._capt(_rec._capt(_rec._capt(newData, 'arguments/0/left/object').id, 'arguments/0/left') === _rec._capt(_rec._capt(_rec._capt(_data2.default, 'arguments/0/right/object/object').attributes, 'arguments/0/right/object').id, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(newData.id === obj.attributes.id)',
                filepath: 'test/index.spec.js',
                line: 15,
                ast: '{"type":"CallExpression","callee":{"type":"Identifier","name":"assert","range":[0,6]},"arguments":[{"type":"BinaryExpression","operator":"===","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"newData","range":[7,14]},"property":{"type":"Identifier","name":"id","range":[15,17]},"computed":false,"range":[7,17]},"right":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj","range":[22,25]},"property":{"type":"Identifier","name":"attributes","range":[26,36]},"computed":false,"range":[22,36]},"property":{"type":"Identifier","name":"id","range":[37,39]},"computed":false,"range":[22,39]},"range":[7,39]}],"range":[0,40]}',
                tokens: '[{"type":{"label":"name"},"value":"assert","range":[0,6]},{"type":{"label":"("},"range":[6,7]},{"type":{"label":"name"},"value":"newData","range":[7,14]},{"type":{"label":"."},"range":[14,15]},{"type":{"label":"name"},"value":"id","range":[15,17]},{"type":{"label":"==/!="},"value":"===","range":[18,21]},{"type":{"label":"name"},"value":"obj","range":[22,25]},{"type":{"label":"."},"range":[25,26]},{"type":{"label":"name"},"value":"attributes","range":[26,36]},{"type":{"label":"."},"range":[36,37]},{"type":{"label":"name"},"value":"id","range":[37,39]},{"type":{"label":")"},"range":[39,40]}]',
                visitorKeys: _powerAssertVisitorKeys
            }));
        });
    });

    describe('index-foreach', function () {
        it('test index from [] to [].x', function () {
            var _rec3 = new _powerAssertRecorder();

            var newData = new _index.DataAdapter(_data2.default, {
                index: [{
                    'from': 'children.[].attributes.id',
                    'to': 'children.[].id'
                }]
            });

            var children = newData.children;
            children.forEach(function (item, idx) {
                var _rec2 = new _powerAssertRecorder();

                assert(_rec2._expr(_rec2._capt(_rec2._capt(_rec2._capt(item, 'arguments/0/left/object').id, 'arguments/0/left') === _rec2._capt(_rec2._capt(_rec2._capt(_rec2._capt(_rec2._capt(_data2.default, 'arguments/0/right/object/object/object/object').children, 'arguments/0/right/object/object/object')[_rec2._capt(idx, 'arguments/0/right/object/object/property')], 'arguments/0/right/object/object').attributes, 'arguments/0/right/object').id, 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(item.id === obj.children[idx].attributes.id)',
                    filepath: 'test/index.spec.js',
                    line: 32,
                    ast: '{"type":"CallExpression","callee":{"type":"Identifier","name":"assert","range":[0,6]},"arguments":[{"type":"BinaryExpression","operator":"===","left":{"type":"MemberExpression","object":{"type":"Identifier","name":"item","range":[7,11]},"property":{"type":"Identifier","name":"id","range":[12,14]},"computed":false,"range":[7,14]},"right":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"MemberExpression","object":{"type":"Identifier","name":"obj","range":[19,22]},"property":{"type":"Identifier","name":"children","range":[23,31]},"computed":false,"range":[19,31]},"property":{"type":"Identifier","name":"idx","range":[32,35]},"computed":true,"range":[19,36]},"property":{"type":"Identifier","name":"attributes","range":[37,47]},"computed":false,"range":[19,47]},"property":{"type":"Identifier","name":"id","range":[48,50]},"computed":false,"range":[19,50]},"range":[7,50]}],"range":[0,51]}',
                    tokens: '[{"type":{"label":"name"},"value":"assert","range":[0,6]},{"type":{"label":"("},"range":[6,7]},{"type":{"label":"name"},"value":"item","range":[7,11]},{"type":{"label":"."},"range":[11,12]},{"type":{"label":"name"},"value":"id","range":[12,14]},{"type":{"label":"==/!="},"value":"===","range":[15,18]},{"type":{"label":"name"},"value":"obj","range":[19,22]},{"type":{"label":"."},"range":[22,23]},{"type":{"label":"name"},"value":"children","range":[23,31]},{"type":{"label":"["},"range":[31,32]},{"type":{"label":"name"},"value":"idx","range":[32,35]},{"type":{"label":"]"},"range":[35,36]},{"type":{"label":"."},"range":[36,37]},{"type":{"label":"name"},"value":"attributes","range":[37,47]},{"type":{"label":"."},"range":[47,48]},{"type":{"label":"name"},"value":"id","range":[48,50]},{"type":{"label":")"},"range":[50,51]}]',
                    visitorKeys: _powerAssertVisitorKeys
                }));
            });

            assert(_rec3._expr(_rec3._capt(_rec3._capt(newData, 'arguments/0/left') !== _rec3._capt(_data2.default, 'arguments/0/right'), 'arguments/0'), {
                content: 'assert(newData !== obj)',
                filepath: 'test/index.spec.js',
                line: 35,
                ast: '{"type":"CallExpression","callee":{"type":"Identifier","name":"assert","range":[0,6]},"arguments":[{"type":"BinaryExpression","operator":"!==","left":{"type":"Identifier","name":"newData","range":[7,14]},"right":{"type":"Identifier","name":"obj","range":[19,22]},"range":[7,22]}],"range":[0,23]}',
                tokens: '[{"type":{"label":"name"},"value":"assert","range":[0,6]},{"type":{"label":"("},"range":[6,7]},{"type":{"label":"name"},"value":"newData","range":[7,14]},{"type":{"label":"==/!="},"value":"!==","range":[15,18]},{"type":{"label":"name"},"value":"obj","range":[19,22]},{"type":{"label":")"},"range":[22,23]}]',
                visitorKeys: _powerAssertVisitorKeys
            }));
        });
    });
});
//# sourceMappingURL=index.spec.js.map