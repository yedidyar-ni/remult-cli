/* eslint-disable sonarjs/no-duplicate-string */
import { expect, test, describe } from "vitest";
import { build_column } from "./getEntityTypescriptPostgres.js";

describe("#unit-test build_column", () => {
	test("string not nullable wo default val", () => {
		const info = build_column({
			decorator: "@Fields.string",
			decoratorArgsValueType: "",
			decoratorArgsOptions: [],
			columnNameTweak: null,
			columnName: "name",
			isNullable: "NO",
			type: "string",
			defaultVal: null,
		});
		expect(info.col).toMatchInlineSnapshot(`
			"	@Fields.string()
				name!: string"
		`);
	});

	test("string nullable wo default val", () => {
		const info = build_column({
			decorator: "@Fields.string",
			decoratorArgsValueType: "",
			decoratorArgsOptions: [],
			columnNameTweak: null,
			columnName: "name",
			isNullable: "YES",
			type: "string",
			defaultVal: null,
		});
		expect(info.col).toMatchInlineSnapshot(`
			"	@Fields.string({ allowNull: true })
				name?: string"
		`);
	});

	test("string nullable w default val", () => {
		const info = build_column({
			decorator: "@Fields.string",
			decoratorArgsValueType: "",
			decoratorArgsOptions: [],
			columnNameTweak: null,
			columnName: "name",
			isNullable: "YES",
			type: "string",
			defaultVal: "Hello World",
		});
		expect(info.col).toMatchInlineSnapshot(`
			"	@Fields.string({ allowNull: true })
				name?: string = Hello World"
		`);
	});

	test("password", () => {
		const info = build_column({
			decorator: "@Fields.string",
			decoratorArgsValueType: "",
			decoratorArgsOptions: [],
			columnNameTweak: null,
			columnName: "password",
			isNullable: "NO",
			type: "string",
			defaultVal: null,
		});
		expect(info.col).toMatchInlineSnapshot(`
			"	@Fields.string({ includeInApi: false, inputType: 'password' })
				password!: string"
		`);
	});

	test("email", () => {
		const info = build_column({
			decorator: "@Fields.string",
			decoratorArgsValueType: "",
			decoratorArgsOptions: [],
			columnNameTweak: null,
			columnName: "email",
			isNullable: "YES",
			type: "string",
			defaultVal: null,
		});
		expect(info.col).toMatchInlineSnapshot(`
			"	@Fields.string({ allowNull: true, inputType: 'email' })
				email?: string"
		`);
	});
});
