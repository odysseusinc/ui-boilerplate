class CrudActionNameBuilder {
	private name: string;
	
	constructor(name) {
		this.name = name;
	}

	query() {
		this.name += '_QUERY';
		return this;
	}

	find() {
		this.name += '_FIND';
		return this;
	}

	create() {
		this.name += '_CREATE';
		return this;
	}
	update() {
		this.name += '_UPDATE';
		return this;
	}

	delete() {
		this.name += '_DELETE';
		return this;
	}

	pending() {
		this.name += '_PENDING';
		return this;
	}

	done() {
		this.name += '_FULFILLED';
		return this;
	}

	toString() {
		return this.name;
	}
}

function action(name) {
	return new CrudActionNameBuilder(name);
}

export default CrudActionNameBuilder;
export {
	action,
};
