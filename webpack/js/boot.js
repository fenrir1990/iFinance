import {bootstrap} from 'angular2/platform/browser';
import {TodoComponent} from './TodoComponent';

let boot = document.addEventListener('DOMContentLoaded', () => {
    bootstrap(TodoComponent);
});

module.exports = boot;