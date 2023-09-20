"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
var Parser_1 = require("./Parser");
var Lexer = /** @class */ (function () {
    function Lexer() {
    }
    Lexer.tokenize = function (line) {
        var word = "";
        var tokens = [];
        for (var i = 0; i < line.length; i++) {
            // Store the value of current token being processed
            var currentToken = line[i];
            // Ingore whitespaces
            if (currentToken === " ") {
                continue;
            }
            // If the current token is not a minus (-)
            // and the regex matches the current token
            // means that the current token is invalid - Eg, @ # $ > ?
            if (/[^\w+*\/-]/gm.exec(currentToken) != null) {
                throw new Error("Syntax Error [Lexer]: Found invalid character \u2013 ".concat(currentToken, " at position ").concat(i + 1));
            }
            // If the current token is an operator
            if (Lexer.operators[currentToken] != undefined) {
                if (word)
                    tokens.push({ kind: "number", value: word });
                word = "";
                tokens.push({
                    kind: Lexer.operators[currentToken],
                    value: currentToken,
                });
            }
            else
                word += currentToken;
        }
        if (word)
            tokens.push({ kind: "number", value: word });
        tokens.push({ kind: "EOF", value: Parser_1.EOF });
        return tokens;
    };
    Lexer.operators = {
        "+": "PLUS",
        "-": "MINUS",
        "*": "MUL",
        "/": "DIV",
    };
    return Lexer;
}());
exports.Lexer = Lexer;
