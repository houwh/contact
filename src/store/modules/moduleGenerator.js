/*
 * @Author: cuiweiqiang
 * @Date:   2017-11-03 11:48:06
 * @Last Modified by:   cuiweiqiang
 * @Last Modified time: 2017-11-04 16:57:50
 */
import * as types from '../mutation-types.js'
import api from '../../api/api'
import moment from 'moment'


class State {
    constructor(name) {
        this.name = name;
    }
};

class Getters {
    constructor(name) {
        this.name = name;
    }
};

class Actions {
    constructor(name) {
        this.name = name;
    }
};

class Mutations {
    constructor(name) {
        this.name = name;
    }
};

class Generator {
    constructor(name) {
        this.state = new State(name),
            this.getters = new Getters(name),
            this.actions = new Actions(name),
            this.mutations = new Mutations(name),
    }
};

export default Generator;