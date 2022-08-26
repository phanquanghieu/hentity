#!/usr/bin/env node
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
const { Command } = require('commander')
const resolveCwd = require('resolve-cwd')
// const fse = require('fs-extra')
// const { resolve } = require('path')
// const { set } = require('lodash')

const program = new Command()

const getScript =
  (name) =>
  (...args) => {
    const commandPath = resolveCwd.silent(`hentity/commands/${name}`)
    if (!commandPath) {
      console.log(`Error loading command script: ${name}`)
      process.exit(1)
    }

    const script = require(commandPath)
    Promise.resolve()
      .then(() => {
        return script(...args)
      })
      .catch((err) => {
        console.error(err)
        process.exit(1)
      })
  }

program.helpOption('-h, --help', 'Display help for command')

program.command('init').description('Init your Hentity application').action(getScript('init'))

program.command('start').description('Start your Hentity application').action(getScript('start'))

program.command('develop').description('Develop your Hentity application').action(getScript('develop'))

program.parseAsync(process.argv)
