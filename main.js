"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer_1 = require("./src/Lexer");
var Parser_1 = require("./src/Parser");
var simpleLine = "5  -  2 * 3 / 4 + 8";
try {
    var tokens = Lexer_1.Lexer.tokenize(simpleLine);
    var AST = Parser_1.Parser.produceAST(tokens);
    console.log(AST);
}
catch (e) {
    console.log(e.message);
}
// TODO: Implement BIDMAS
// Brackets
// Indices
// Division
// Multiplication
// Addition
// Subtraction
// TODO: AST not working properly!!
// FIX: Render the token in tree structure from top to bottom
