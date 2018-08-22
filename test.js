'use strict';

const {join} = require('path');

const {lint} = require('stylelint');
const formatter = require('.');
const test = require('tape');

const config = {
	rules: {}
};

test('stylelint-formatter-simplest', async t => {
	t.equal(
		(await lint({
			files: [__filename],
			config,
			formatter
		})).output,
		'',
		'should return \'\' if there is no warnings.'
	);

	t.equal(
		(await lint({
			files: [__filename],
			config: {
				rules: {
					linebreaks: 'windows'
				}
			},
			formatter
		})).output,
		'!',
		'should return \'!\' if there is one or more `error`-level warnings.'
	);

	t.equal(
		(await lint({
			files: [__filename],
			config: {
				rules: {
					linebreaks: 'windows'
				},
				ignoreFiles: [__filename]
			},
			formatter
		})).output,
		'',
		'should not take ignored files into consideration.'
	);

	t.equal(
		(await lint({
			code: 'p{}\r\n',
			codeFilename: join(__dirname, 'windows-linebreak.css'),
			config: {
				rules: {
					linebreaks: ['unix', {severity: 'warning'}]
				}
			},
			formatter
		})).output,
		'!',
		'should return \'!\' if there is one or more `warning`-level warnings.'
	);

	t.equal(
		(await lint({
			code: '}',
			codeFilename: join(__dirname, 'unclosed.css'),
			config,
			formatter
		})).output,
		'!',
		'should return \'!\' if the CSS has an syntax error.'
	);

	t.equal(
		(await lint({
			code: ':',
			codeFilename: join(__dirname, 'colon.css'),
			config: {
				rules: {},
				ignoreFiles: '**/*.css'
			},
			formatter
		})).output,
		'',
		'should return \'\' if `codeFilename` matches ignore pattern.'
	);

	t.equal(
		(await lint({
			code: 'a{}',
			codeFilename: join(__dirname, 'valid.css'),
			config: {
				rules: {
					linebreaks: ['1234567890']
				}
			},
			formatter
		})).output,
		'!',
		'should return \'!\' if one of the rule settings has an invalid option.'
	);

	t.end();
});
