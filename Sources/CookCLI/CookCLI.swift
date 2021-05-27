//
//  CookCLI.swift
//
//
//  Created by Alexey Dubovskoy on 19/04/2021.
//

import Foundation
import ArgumentParser
import App
import CookInSwift

struct CookCLI: ParsableCommand {

    struct Recipe: ParsableCommand {
        struct Read: ParsableCommand {

            @Argument(help: "Set cook file")
            var file: String

            // MARK: ParsableCommand
            static var configuration: CommandConfiguration = CommandConfiguration(abstract: "Read cook file and dispay it.")

            @Flag var onlyIngredients = false
            @Flag var onlySteps = false

            func run() throws {
                let recipe = try String(contentsOfFile: file, encoding: String.Encoding.utf8)
                let parser = Parser(recipe)
                let node = parser.parse()
                let analyzer = SemanticAnalyzer()
                let parsed = analyzer.analyze(node: node)

                let printer = TextRecipePrinter()

                printer.print(parsed, onlyIngredients: onlyIngredients, onlySteps: onlySteps).forEach { line in
                    print(line)
                }
            }
        }

        // MARK: ParsableCommand
        static var configuration: CommandConfiguration = CommandConfiguration(abstract: "A Swift command-line tool to manage recipes",
            discussion: "Recipe",
            subcommands: [
                Read.self
            ]
        )
    }

    struct ShoppingList: ParsableCommand {

        @Argument(help: "List all ingredients from recipes")
        var filesOrDirectory: [String]

        // MARK: ParsableCommand
        static var configuration: CommandConfiguration = CommandConfiguration(abstract: "List all ingredients from recipes")

        func run() throws {
            var ingredientTable = IngredientTable()

            var files: [String]

            if filesOrDirectory.count == 1 && directoryExistsAtPath(filesOrDirectory[0]) {
                let directory = filesOrDirectory[0]
                let directoryContents = try FileManager.default.contentsOfDirectory(atPath: directory)
                files = directoryContents.filter{ $0.hasSuffix("cook") }.map { "\(directory)/\($0)" }
            } else {
                files = filesOrDirectory
            }


            try files.forEach { file in
                let recipe = try String(contentsOfFile: file, encoding: String.Encoding.utf8)
                let parser = Parser(recipe)
                let node = parser.parse()
                let analyzer = SemanticAnalyzer()
                let parsed = analyzer.analyze(node: node)

                ingredientTable = ingredientTable + parsed.ingredientsTable
            }

            for (ingredient, amounts) in ingredientTable.ingredients {
                print(ingredient.padding(toLength: 30, withPad: " ", startingAt: 0), "\t", amounts.description)
            }

        }

        fileprivate func directoryExistsAtPath(_ path: String) -> Bool {
            var isDirectory = ObjCBool(true)
            let exists = FileManager.default.fileExists(atPath: path, isDirectory: &isDirectory)
            return exists && isDirectory.boolValue
        }
    }

    struct Server: ParsableCommand {
        func run() throws {
            try startServer()
        }
    }

    struct Version: ParsableCommand {
        func run() throws {
            print("v0.0.1 – in food we trust")
        }
    }

    // MARK: ParsableCommand
    static var configuration: CommandConfiguration = CommandConfiguration(abstract: "A Swift command-line tool to manage recipes",
        discussion: "Requires a thing",
        subcommands: [
            Recipe.self,
            ShoppingList.self,
            Server.self,
            Version.self
        ]
    )


}
