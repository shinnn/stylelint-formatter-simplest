'use strict';

module.exports = function stylelintFormatterSimplest(arr) {
	for (const {ignored, invalidOptionWarnings, warnings} of arr) {
		if (ignored) {
			continue;
		}

		if (invalidOptionWarnings.length !== 0 || warnings.length !== 0) {
			return '!';
		}
	}

	return '';
};
