const numf = Intl.NumberFormat(undefined, { maximumFractionDigits: 3 });

interface RegularNumber {
	type: 'regular';
	value: number;
}

interface FractionalNumber {
	type: 'fractional';
	value: {
		whole: number;
		num: number;
		den: number;
		err: number;
	};
}

interface RangeType {
    start: NumberType;
    end: NumberType;
}

interface DataType {
    type: 'number' | 'range' | 'text';
    value: NumberType | RangeType | { start: NumberType; end: NumberType } | string;
}

export interface Quantity { value: DataType; unit: string }

type NumberType = RegularNumber | FractionalNumber;

function extractNumberValue(n: NumberType): number {
	if (n.type === 'regular') {
		return n.value;
	} else {
		const { whole, num, den, err } = n.value;
		return whole + num / den + err;
	}
}

function formatNumber(n: NumberType): [string, number] {
	if (n.type === 'regular') {
		const val = extractNumberValue(n);
		return [numf.format(val), 0];
	} else {
		const parts = [];
		const { whole, num, den, err } = n.value;
		if (whole != 0) parts.push(numf.format(whole));
		if (num != 0) parts.push(formatFraction(num, den));
		if (parts.length === 0) parts.push('0');
		return [parts.join(' '), err];
	}
}

function formatFraction(num: number, den: number): string {
	if (den === 0) {
		return 'Inf'; // ...
	}

	const repr = `${numf.format(num)}/${numf.format(den)}`;

	const fractions: { [key: string]: string } = {
		'1/2': '½',
		'1/3': '⅓',
		'2/3': '⅔',
		'1/4': '¼',
		'3/4': '¾',
		'1/5': '⅕',
		'2/5': '⅖',
		'3/5': '⅗',
		'4/5': '⅘',
		'1/6': '⅙',
		'5/6': '⅚',
		'1/7': '⅐',
		'1/8': '⅛',
		'3/8': '⅜',
		'5/8': '⅝',
		'7/8': '⅞',
		'1/9': '⅑',
		'1/10': '⅒'
	};

	return fractions[repr] ?? repr;
}

export function formatQuantity(quanity: Quantity) {
	if (!quanity) return 'some';

	let result = '';
	let value = quanity.value;

	switch (value.type) {
		case 'number':
			let v = formatNumber(value.value as NumberType);
			result = v[0];
			break;
		case 'range':
			const [start, es] = formatNumber((value.value as RangeType).start);
			const [end, ee] = formatNumber((value.value as RangeType).end);
			result = `${start}-${end}`;
			break;
		case 'text':
			result = value.value as string;
			break;
		default:
		// code block
	}

	if (quanity.unit) result = `${result} ${quanity.unit}`;

	return result;
}

export function formatQuantityValue(value: DataType) {
	switch (value.type) {
		case 'number':
			return formatNumber(value.value as NumberType)[0];
		case 'range':
			const [start, es] = formatNumber((value.value as RangeType).start);
			const [end, ee] = formatNumber((value.value as RangeType).end);
			return `${start}-${end}`;
		case 'text':
			return value.value as string;
		default:
			return '';
	}
}

export function formatGroupedQuantity(quanities: { value: DataType; unit: string } | { value: DataType; unit: string }[]) {
	if (!Array.isArray(quanities)) {
		quanities = [quanities];
	}
	return quanities.map(formatQuantity).join(', ');
}
