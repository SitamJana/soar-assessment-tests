const { createLogEntry } = require('./log-helper');
const { faker } = require('@faker-js/faker');

/**
 * Pauses execution for the specified number of milliseconds.
 *
 * Creates a Promise that resolves after the given time, allowing for asynchronous
 * waiting without blocking the event loop.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise} A Promise that resolves after the specified time.
 */
function sleep(logger, ms) {
    createLogEntry(logger, `Sleeping for ${ms / 1000} second(s)`);
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Generate a strong password
 * 
 * @param {number} length 
 * @returns {String} strong password created
 */
function generateStrongPassword(length = 8) {
    let password = '';

    // Ensure at least one uppercase letter
    password += faker.string.alpha({ length: 1, casing: 'upper' });

    // Ensure at least one lowercase letter
    password += faker.string.alpha({ length: 1, casing: 'lower' });

    // Ensure at least one digit
    password += faker.number.int(99);

    // Ensure at least one special character
    const specialChars = '!@#$%^&*()_+=-[]{}|;:,.<>/?';
    const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    password += randomSpecialChar;

    // Fill the rest of the password with random characters
    while (password.length < length) {
        password += faker.string.alphanumeric(1);
    }

    // Shuffle the characters in the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}

module.exports = { sleep, generateStrongPassword };