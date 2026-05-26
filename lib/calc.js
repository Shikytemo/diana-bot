// Safe math expression evaluator — no eval(), no external deps

const tokenize = expr => {
	const tokens = []
	let i = 0
	while (i < expr.length) {
		const c = expr[i]
		if (c === ' ') { i++; continue }
		if ('0123456789.'.includes(c)) {
			let num = ''
			while (i < expr.length && '0123456789.'.includes(expr[i])) num += expr[i++]
			tokens.push({ type: 'num', value: parseFloat(num) })
		} else if ('+-*/^%'.includes(c)) {
			tokens.push({ type: 'op', value: c })
			i++
		} else if (c === '(' || c === ')') {
			tokens.push({ type: 'paren', value: c })
			i++
		} else if (expr.slice(i, i + 3) === 'mod') {
			tokens.push({ type: 'op', value: '%' })
			i += 3
		} else if (expr.slice(i, 4) === 'sqrt') {
			tokens.push({ type: 'func', value: 'sqrt' })
			i += 4
		} else if (expr.slice(i, 3) === 'abs') {
			tokens.push({ type: 'func', value: 'abs' })
			i += 3
		} else if (expr.slice(i, 2) === 'pi') {
			tokens.push({ type: 'num', value: Math.PI })
			i += 2
		} else {
			throw new Error(`Karakter tidak dikenali: ${c}`)
		}
	}
	return tokens
}

const precedence = op => ({ '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3 }[op] || 0)
const applyOp = (op, b, a) => {
	switch (op) {
		case '+': return a + b
		case '-': return a - b
		case '*': return a * b
		case '/': if (b === 0) throw new Error('Bagi nol!'); return a / b
		case '%': return a % b
		case '^': return Math.pow(a, b)
		default: throw new Error(`Operator tidak dikenali: ${op}`)
	}
}

const evaluate = tokens => {
	const values = [], ops = []
	const funcs = { sqrt: Math.sqrt, abs: Math.abs }

	for (let i = 0; i < tokens.length; i++) {
		const t = tokens[i]
		if (t.type === 'num') {
			values.push(t.value)
		} else if (t.type === 'func') {
			ops.push(t.value)
		} else if (t.type === 'paren' && t.value === '(') {
			ops.push('(')
		} else if (t.type === 'paren' && t.value === ')') {
			while (ops.length && ops[ops.length - 1] !== '(') {
				const op = ops.pop()
				if (funcs[op]) {
					values.push(funcs[op](values.pop()))
				} else {
					values.push(applyOp(op, values.pop(), values.pop()))
				}
			}
			ops.pop() // remove '('
			if (funcs[ops[ops.length - 1]]) {
				values.push(funcs[ops.pop()](values.pop()))
			}
		} else if (t.type === 'op') {
			while (ops.length && ops[ops.length - 1] !== '(' && precedence(ops[ops.length - 1]) >= precedence(t.value)) {
				const op = ops.pop()
				if (funcs[op]) {
					values.push(funcs[op](values.pop()))
				} else {
					values.push(applyOp(op, values.pop(), values.pop()))
				}
			}
			ops.push(t.value)
		}
	}

	while (ops.length) {
		const op = ops.pop()
		if (funcs[op]) {
			values.push(funcs[op](values.pop()))
		} else {
			values.push(applyOp(op, values.pop(), values.pop()))
		}
	}

	return values[0]
}

export const calcForReply = expression => {
	try {
		const expr = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/x/gi, '*')
		const tokens = tokenize(expr)
		const result = evaluate(tokens)
		const rounded = Number.isInteger(result) ? result : parseFloat(result.toFixed(8))
		return { ok: true, text: `🧮 *Calculator*\n\n\`${expr}\` = *${rounded}*`, result: rounded }
	} catch (error) {
		return { ok: false, text: `❌ Kalkulasi gagal: ${error.message}` }
	}
}
