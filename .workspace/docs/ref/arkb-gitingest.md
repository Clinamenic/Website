Directory structure:
└── textury-arkb/
├── README.md
├── LICENSE
├── package.json
├── tsconfig.json
├── tslint.json
├── .prettierrc
├── src/
│ ├── app.ts
│ ├── commands.ts
│ ├── declarations.d.ts
│ ├── commands/
│ │ ├── balance.ts
│ │ ├── deploy.ts
│ │ ├── fundBundler.ts
│ │ ├── help.ts
│ │ ├── network.ts
│ │ ├── status.ts
│ │ ├── transfer.ts
│ │ ├── version.ts
│ │ ├── walletExport.ts
│ │ ├── walletForget.ts
│ │ ├── walletSave.ts
│ │ └── withdrawBundler.ts
│ ├── faces/
│ │ ├── arguments.ts
│ │ ├── bundler.ts
│ │ ├── command.ts
│ │ ├── option.ts
│ │ └── txDetail.ts
│ ├── lib/
│ │ ├── deploy.ts
│ │ ├── status.ts
│ │ ├── tags.ts
│ │ └── transfer.ts
│ ├── options/
│ │ ├── autoConfirm.ts
│ │ ├── bundle.ts
│ │ ├── concurrency.ts
│ │ ├── contentType.ts
│ │ ├── debug.ts
│ │ ├── feeMultiplier.ts
│ │ ├── force.ts
│ │ ├── gateway.ts
│ │ ├── help.ts
│ │ ├── index.ts
│ │ ├── license.ts
│ │ ├── noColors.ts
│ │ ├── tagName.ts
│ │ ├── tagValue.ts
│ │ ├── timeout.ts
│ │ ├── useBundler.ts
│ │ └── wallet.ts
│ └── utils/
│ ├── bundler.ts
│ ├── cache.ts
│ ├── cli-questions.ts
│ ├── createTransactionAsync.ts
│ ├── crypter.ts
│ ├── deploy.ts
│ ├── generateTransactionChunksAsync.ts
│ ├── showDeployDetails.ts
│ ├── uploadTransactionAsync.ts
│ ├── utils.ts
│ └── wallet.ts
├── .github/
│ └── workflows/
│ └── deploy.yml
└── .husky/
└── pre-commit

Files Content:

================================================
File: README.md
================================================

# arkb

Arweave Deploy that saves you data costs.

## Features

- No file size limit.
- No amount of files limit.
- Doesn't upload files that you have already uploaded.

## How to use

arkb runs using NodeJS and NPM. You must have both installed on your machine for it to work.

Install arkb:

```
yarn global add arkb # recommended
```

or

```
npm install -g arkb
```

> **Note:** The installation of arkb needs node >=15.11.0 or you will get an error when using `arkb`. To manage multiple active nodejs, we recommend you have [nvm](https://github.com/nvm-sh/nvm) installed on your computer, then you can switch different node in a simple command.

And run:

```
arkb help
```

> **Note:** If you are planning to upload large batches of data transactions to the Arweave network, it is _strongly_ advised that you use the `--use-bundler` option instead of regular deploy to avoid transaction failures. You can read about bundles and their advantages on the [Arwiki](https://arwiki.wiki/#/en/preview/WUAtjfiDQEIqhsUcHXIFTn5ZmeDIE7If9hJREBLRgak).

```
                    d8b        d8b
                    ?88        ?88
                     88b        88b
 d888b8b    88bd88b  888  d88'  888888b
d8P' ?88    88P'  `  888bd8P'   88P `?8b
88b  ,88b  d88      d88888b    d88,  d88
`?88P'`88bd88'     d88' `?88b,d88'`?88P'



Usage: arkb [options] [command]

Options                                 Description
--auto-confirm                          Skips the confirm screen
--concurrency -c <number>               Multi thread, default is 5
--content-type <content type>           Set the files content type
--debug                                 Display log messages
--fee-multiplier -m <number>            Set the fee multiplier for all transactions
--force -f                              Force a redeploy of all the files
--gateway -g <host_or_ip>               Set the gateway hostname or ip address
--help -h                               Show usage help for a command
--license                               Specify the license of your upload with an spdx li
--no-colors                             Print to terminal without fancy colors
--tag-name <name>                       Set a tag name
--tag-value <value>                     Set a tag value
--timeout -t <number>                   Set the request timeout
--bundle                                Locally bundle your files and deploy to Arweave
--use-bundler <host_or_ip>              Use an ans104 bundler service
--wallet -w <wallet_path>               Set the key file path

Commands (alias)                        Description
balance (b)                             Get the current balance of your wallet
deploy (d) <folder_or_file>             Deploy a directory or file
fund-bundler <amount>                   Fund your bundler account
help (h)                                Show usage help for a command
network (n)                             Get the current network info
status (s) <txid>                       Check the status of a transaction ID
transfer <address> <amount>             Send funds to an Arweave wallet
version (v)                             Show the current arkb version number
wallet-export (we)                      Exports a previously saved wallet
wallet-forget (wf)                      Removes a previously saved wallet
wallet-save (ws) <wallet_path>          Saves a wallet, removes the need of the --wallet option
withdraw-bundler <amount>               Withdraw from your bundler balance
```

## Contributing

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀

================================================
File: LICENSE
================================================
MIT License

Copyright (c) 2020 Cedrik Boudreau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

================================================
File: package.json
================================================
{
"name": "arkb",
"version": "1.1.61",
"main": "./bin/app.js",
"repository": "https://github.com/textury/arkb.git",
"author": "Cedrik <cedrik.git@tryninja.io>",
"license": "MIT",
"files": [
"bin/**/*"
],
"bin": {
"arkb": "./bin/app.js"
},
"scripts": {
"start": "node ./bin/app.js",
"predev": "yarn build",
"dev": "node ./bin/app.js",
"prebuild": "rimraf bin",
"build": "tsc",
"format": "prettier --write \"src/\*_/_.ts\"",
"lint": "tslint -p tsconfig.json",
"prepare": "npm run build && husky install",
"prepublishOnly": "npm run lint",
"preversion": "npm run lint",
"version": "npm run format && git add -A src",
"postversion": "git push && git push --tags"
},
"engines": {
"node": ">=15.11.0",
"npm": ">=7.6.0"
},
"dependencies": {
"@supercharge/promise-pool": "^1.7.0",
"@textury/ardb": "^1.1.3",
"arbundles": "^0.6.19",
"arweave": "1.11.4",
"arweave-stream-tx": "^1.1.0",
"axios": "^0.21.4",
"blockweave": "^1.0.15",
"clear": "^0.1.0",
"cli-color": "^2.0.0",
"clui": "^0.3.6",
"community-js": "^1.1.68",
"conf": "^10.0.2",
"exponential-backoff": "^3.1.0",
"fast-glob": "^3.2.7",
"figlet": "^1.5.2",
"fuse.js": "^6.4.6",
"inquirer": "^8.1.2",
"mime": "^2.5.2",
"minimist": "^1.2.5",
"normalize-path": "^3.0.0",
"p-retry": "^4.6.1",
"spdx-license-ids": "^3.0.10",
"stream-chunker": "^1.2.8",
"temp-dir": "^2.0.0"
},
"devDependencies": {
"@types/clear": "^0.1.2",
"@types/figlet": "^1.5.4",
"@types/inquirer": "^7.3.3",
"@types/mime": "^2.0.3",
"@types/minimist": "^1.2.2",
"@types/node": "^16.7.1",
"husky": "^7.0.0",
"prettier": "^2.3.2",
"rimraf": "^3.0.2",
"ts-node": "^10.2.1",
"tslint": "^6.1.3",
"tslint-config-prettier": "^1.18.0",
"typescript": "^4.3.5"
}
}

================================================
File: tsconfig.json
================================================
{
"compilerOptions": {
"target": "esNext",
"module": "commonjs",
"declaration": true,
"outDir": "./bin",
"esModuleInterop": true,
"skipLibCheck": true
},
"include": ["src"],
"exclude": ["node_modules", "**/__tests__/*"]
}

================================================
File: tslint.json
================================================
{
"extends": ["tslint:recommended", "tslint-config-prettier"],
"rules": {
"no-console": false
}
}

================================================
File: .prettierrc
================================================
{
"printWidth": 120,
"trailingComma": "all",
"singleQuote": true
}

================================================
File: src/app.ts
================================================
#!/usr/bin/env node

import minimist from 'minimist';
import Conf from 'conf';
import CliCommands from './commands';
import { setArweaveInstance } from './utils/utils';

const argv = minimist(process.argv.slice(2));
const config = new Conf();
const debug = !!argv.debug;
const blockweave = setArweaveInstance(argv, debug);

const cliCommands = new CliCommands();
cliCommands
.cliTask({
argv,
config,
debug,
blockweave,
})
.then(() => {
process.exit(0);
})
.catch((e) => {
if (debug) console.log(e);
process.exit(1);
});

================================================
File: src/commands.ts
================================================
import fs from 'fs';
import path from 'path';
import spdx from 'spdx-license-ids';
import Fuse from 'fuse.js';
import { URL } from 'url';
import Api from 'arweave/node/lib/api';
import Tags from './lib/tags';
import CommandInterface from './faces/command';
import ArgumentsInterface from './faces/arguments';
import OptionInterface from './faces/option';
import { parseColor } from './utils/utils';

export default class CliCommands {
options: Map<string, OptionInterface> = new Map();
commands: Map<string, CommandInterface> = new Map();
bundler: Api;

constructor() {
// Commands
const commandFiles = fs.readdirSync(path.join(\_\_dirname, 'commands')).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(__dirname, 'commands', file);

      const { default: comm } = require(filePath);
      this.commands.set(comm.name, comm);
      this.addAliases(comm);
    }

    // Options
    const optionFiles = fs.readdirSync(path.join(__dirname, 'options')).filter((file) => file.endsWith('.js'));

    for (const file of optionFiles) {
      const filePath = path.join(__dirname, 'options', file);

      const { default: opt } = require(filePath);
      this.options.set(opt.name, opt);
    }

}

async cliTask(partialArgs: Partial<ArgumentsInterface>) {
let command = partialArgs.argv._[0];
const commandValues = partialArgs.argv._.slice(1);

    if (!command) {
      command = 'help';
    }

    const tags = new Tags();
    const tagNames = partialArgs.argv['tag-name'];
    const tagValues = partialArgs.argv['tag-value'];

    if (tagNames && tagValues) {
      const isArrayTagNames = Array.isArray(tagNames);
      const isArrayTagValues = Array.isArray(tagValues);

      if (isArrayTagNames && isArrayTagValues) {
        for (let i = 0; i < tagNames.length; i++) {
          const name = tagNames[i]?.toString();
          const value = tagValues[i]?.toString();
          if (name && value) {
            tags.addTag(name, value);
          }
        }
      } else {
        tags.addTag(
          Array.isArray(tagNames) ? tagNames[0].toString() : tagNames.toString(),
          Array.isArray(tagValues) ? tagValues[0].toString() : tagValues.toString(),
        );
      }
    }

    // Get the options aliases and set the option value to the alias value
    for (const option of this.options.values()) {
      if (option.alias) {
        const alias = partialArgs.argv[option.alias];
        if (alias) {
          partialArgs.argv[option.name] = alias;
        }
      }
    }

    let feeMultiplier = 1;
    if (partialArgs.argv['fee-multiplier']) {
      try {
        const feeArgv = parseFloat(partialArgs.argv['fee-multiplier']);
        if (feeArgv > 1) {
          feeMultiplier = feeArgv;
        }
        // tslint:disable-next-line: no-empty
      } catch {}
    }

    let useBundler = partialArgs.argv['use-bundler'];
    const colors = partialArgs.argv.colors;

    if (useBundler) {
      let parsed;
      if (typeof useBundler === 'boolean' && useBundler === true) {
        // reassign useBundler arg for all instances that use it
        partialArgs.argv['use-bundler'] = 'https://node2.bundlr.network';
        useBundler = 'https://node2.bundlr.network';
      }

      try {
        parsed = new URL(useBundler);
      } catch (e) {
        console.log(parseColor(colors, '[--use-bundler] Invalid url format', 'red'));
        if (partialArgs.debug) console.log(e);
        process.exit(1);
      }
      this.bundler = new Api({ ...parsed, host: parsed.hostname });
    }

    if (useBundler && feeMultiplier > 1) {
      console.log(parseColor(colors, '\nFee multiplier is ignored when using the bundler', 'yellow'));
      feeMultiplier = 1;
    }

    let license = '';

    if (partialArgs.argv.license) {
      license = partialArgs.argv.license;
      if (!spdx.includes(license)) {
        // help the user
        const fuse = new Fuse(spdx);
        const spdxCandidates = fuse.search(license);
        console.log(parseColor(colors, `\n"${license}" is not a valid spdx license identifier`, 'red'));
        if (spdxCandidates.length > 0) {
          console.log(parseColor(colors, 'Did you mean?', 'yellow'));
          spdxCandidates.slice(0, 5).map((cand) => console.log(parseColor(colors, ` ${cand.item}`, 'blue')));
        } else {
          console.log(
            parseColor(colors, `A list of valid spdx identifiers can be found at https://spdx.org/licenses/`, 'yellow'),
          );
        }
        process.exit(1);
      }
    }

    const contentType = partialArgs.argv['content-type'];

    const args: ArgumentsInterface = {
      argv: partialArgs.argv,
      blockweave: partialArgs.blockweave,
      debug: partialArgs.debug,
      config: partialArgs.config,
      walletPath: partialArgs.argv.wallet,
      command,
      commandValues,
      tags,
      feeMultiplier,
      useBundler,
      bundle: partialArgs.argv.bundle,
      license,
      index: partialArgs.argv.index,
      autoConfirm: partialArgs.argv['auto-confirm'],
      commands: this.commands,
      options: this.options,
      bundler: this.bundler,
      colors: partialArgs.argv.colors,
      contentType,
    };

    if (this.commands.has(command)) {
      const commandObj = this.commands.get(command);
      if (commandObj && typeof commandObj.execute === 'function' && !this.showHelp(commandObj, command, args)) {
        await commandObj.execute(args);
      }
    } else {
      console.log(parseColor(colors, `\nCommand not found: ${command}`, 'red'));
    }

}

private addAliases(commOrOpt: CommandInterface | OptionInterface) {
if ((commOrOpt as CommandInterface).aliases && (commOrOpt as CommandInterface).aliases.length > 0) {
for (const alias of (commOrOpt as CommandInterface).aliases) {
this.commands.set(alias, commOrOpt as CommandInterface);
}
} else if ((commOrOpt as OptionInterface).alias) {
this.options.set((commOrOpt as OptionInterface).alias, commOrOpt as OptionInterface);
}
}

private showHelp(commandObj: CommandInterface, command: string, partialArgs: Partial<ArgumentsInterface>): boolean {
if (commandObj.name === 'help' || !partialArgs.argv.help) {
return false;
}

    const colors = partialArgs.argv.colors;
    console.log(parseColor(colors, `\nExample usage of ${parseColor(colors, command, 'green')}:\n`, 'bold'));
    for (const option of commandObj.options) {
      const usage =
        commandObj.usage && commandObj.usage.length > 0
          ? ` ${commandObj.usage[Math.floor(Math.random() * commandObj.usage.length)]}`
          : '';
      console.log(`${parseColor(colors, `${option.description}:`, 'blackBright')}

arkb ${command + usage} --${option.name}${option.arg ? `=${option.usage}` : ''}\n`);
}

    return true;

}
}

================================================
File: src/declarations.d.ts
================================================
declare module 'spdx-license-ids';

================================================
File: src/commands/balance.ts
================================================
import ArgumentsInterface from '../faces/arguments';
import CommandInterface from '../faces/command';
import { getWallet } from '../utils/wallet';
import gatewayOption from '../options/gateway';
import timeoutOption from '../options/timeout';
import walletOption from '../options/wallet';
import debugOption from '../options/debug';
import helpOption from '../options/help';
import useBundlerOption from '../options/useBundler';
import noColorsOption from '../options/noColors';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import Bundler from '../utils/bundler';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'balance',
aliases: ['b'],
description: 'Get the current balance of your wallet',
options: [gatewayOption, timeoutOption, walletOption, debugOption, helpOption, useBundlerOption, noColorsOption],
execute: async (args: ArgumentsInterface): Promise<void> => {
const { walletPath, config, debug, blockweave, useBundler, bundler, colors } = args;

    const wallet: JWKInterface = await getWallet(walletPath, config, debug, colors);

    if (!wallet) {
      console.log(parseColor(colors, 'Please set a wallet or run with the --wallet option.', 'red'));
      return;
    }

    let addy: string;
    try {
      addy = await blockweave.wallets.jwkToAddress(wallet);
    } catch (e) {
      console.log(parseColor(colors, 'Unable to decrypt wallet address.', 'red'));
      if (debug) console.log(e);
    }

    if (useBundler) {
      try {
        const bal: number = await Bundler.getAddressBalance(bundler, addy);

        console.log(
          `${parseColor(colors, addy, 'cyan')} has a bundler balance of ${parseColor(
            colors,
            `AR ${blockweave.ar.winstonToAr(bal.toString(), { formatted: true, decimals: 12, trim: true })}`,
            'yellow',
          )}`,
        );
      } catch (e) {
        console.log(parseColor(colors, 'Unable to retrieve bundler balance.', 'red'));
        if (debug) console.log(e);
      }
      return;
    }

    try {
      const bal = await blockweave.wallets.getBalance(addy);
      console.log(
        `${parseColor(colors, addy, 'cyan')} has a balance of ${parseColor(
          colors,
          `AR ${blockweave.ar.winstonToAr(bal, { formatted: true, decimals: 12, trim: true })}`,
          'yellow',
        )}`,
      );
    } catch (e) {
      console.log(parseColor(colors, 'Unable to retrieve wallet balance', 'red'));
      if (debug) console.log(e);
    }

},
};

export default command;

================================================
File: src/commands/deploy.ts
================================================
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import Deploy from '../lib/deploy';
import cliQuestions from '../utils/cli-questions';
import { getWallet } from '../utils/wallet';
import { showDeployDetails } from '../utils/showDeployDetails';
import CommandInterface from '../faces/command';
import ArgumentsInterface from '../faces/arguments';
import gatewayOption from '../options/gateway';
import useBundlerOption from '../options/useBundler';
import licenseOption from '../options/license';
import autoConfirmOption from '../options/autoConfirm';
import feeMultiplierOption from '../options/feeMultiplier';
import timeoutOption from '../options/timeout';
import tagNameOption from '../options/tagName';
import tagValueOption from '../options/tagValue';
import walletOption from '../options/wallet';
import debugOption from '../options/debug';
import helpOption from '../options/help';
import forceOption from '../options/force';
import bundleOption from '../options/bundle';
import concurrencyOption from '../options/concurrency';
import noColorsOption from '../options/noColors';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import { getDeployPath } from '../utils/deploy';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'deploy',
aliases: ['d', 'upload'],
description: 'Deploy a directory or file',
options: [
gatewayOption,
useBundlerOption,
bundleOption,
feeMultiplierOption,
tagNameOption,
tagValueOption,
licenseOption,
walletOption,
autoConfirmOption,
timeoutOption,
concurrencyOption,
forceOption,
debugOption,
helpOption,
noColorsOption,
],
args: ['folder_or_file'],
usage: [`folder${path.sep}filename.json`, `.${path.sep}folder`],
execute: async (args: ArgumentsInterface): Promise<void> => {
const {
argv,
commandValues,
walletPath,
config,
debug,
blockweave,
tags,
license,
useBundler,
feeMultiplier,
autoConfirm,
bundle,
bundler,
colors,
contentType,
} = args;

    // Get the wallet
    let wallet: JWKInterface = await getWallet(walletPath, config, debug, colors);

    if (useBundler && !wallet) {
      wallet = await blockweave.wallets.generate();
    }

    if (!wallet) {
      console.log(parseColor(colors, 'Please save a wallet or run with the --wallet option.', 'red'));
      return;
    }

    if (useBundler && bundle) {
      console.log(parseColor(colors, 'You can not use a bundler and locally bundle at the same time', 'red'));
      return;
    }

    const concurrency = argv.concurrency || 5;
    const forceRedeploy = argv.force;

    // Check and get the specified directory or file
    const dir = getDeployPath(commandValues, colors);

    let files = [dir];
    let isFile = true;
    if (fs.lstatSync(dir).isDirectory()) {
      files = await fg([`${dir}/**/*`], { dot: false });
      isFile = false;
    }

    const deploy = new Deploy(wallet, blockweave, debug, concurrency, true, bundle);

    if (!args.index) {
      args.index = 'index.html';
    }

    const txs = await deploy.prepare(
      dir,
      files,
      args.index,
      tags,
      contentType,
      license,
      useBundler,
      feeMultiplier,
      forceRedeploy,
      colors,
    );

    const balAfter = await showDeployDetails(
      txs,
      wallet,
      isFile,
      dir,
      blockweave,
      useBundler,
      deploy.getBundler(),
      license,
      bundler,
      {
        tx: deploy.getBundledTx(),
        bundle: deploy.getBundle(),
      },
      colors,
    );

    if (balAfter < 0) {
      console.log(
        useBundler
          ? parseColor(colors, "You don't have enough bundler balance for this deploy.", 'red')
          : parseColor(colors, "You don't have enough balance for this deploy.", 'red'),
      );
      return;
    }

    // Check if auto-confirm is added
    let res = { confirm: !!autoConfirm };
    if (!autoConfirm) {
      res = await cliQuestions.showConfirm();
    }
    if (!res.confirm) {
      console.log(parseColor(colors, 'Rejected!', 'red'));
      return;
    }

    const manifestTx: string = await deploy.deploy(isFile, useBundler, colors);

    console.log('');
    if (useBundler) {
      console.log(
        parseColor(colors, 'Data items deployed! Visit the following URL to see your deployed content:', 'green'),
      );
    } else {
      console.log(parseColor(colors, 'Files deployed! Visit the following URL to see your deployed content:', 'green'));
    }
    console.log(parseColor(colors, `${blockweave.config.url}/${manifestTx}`, 'cyan'));

},
};

export default command;

================================================
File: src/commands/fundBundler.ts
================================================
import ArgumentsInterface from '../faces/arguments';
import { getWallet } from '../utils/wallet';
import CommandInterface from '../faces/command';
import walletOption from '../options/wallet';
import debugOption from '../options/debug';
import helpOption from '../options/help';
import timeoutOption from '../options/timeout';
import useBundlerOption from '../options/useBundler';
import noColorsOption from '../options/noColors';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'fund-bundler',
description: 'Fund your bundler account',
args: ['amount'],
usage: ['0.3'],
options: [walletOption, debugOption, helpOption, timeoutOption, useBundlerOption, noColorsOption],
execute: async (args: ArgumentsInterface): Promise<void> => {
const { walletPath, bundler, debug, config, blockweave, commandValues, useBundler, colors } = args;

    // Check if we have received a command value
    if (!commandValues || !commandValues.length) {
      console.log(parseColor(colors, 'You forgot to set the amount.', 'red'));
      return;
    }

    const amount = commandValues[0];
    const wallet: JWKInterface = await getWallet(walletPath, config, debug, colors);

    if (!wallet) {
      return;
    }

    if (!useBundler) {
      console.log(parseColor(colors, 'Please set bundler address', 'red'));
      return;
    }

    // Get the bundler address and make a non-data transaction to the address
    let bundlerAddress: string;
    try {
      const res = await bundler.get('/info');
      bundlerAddress = res.data.address || res.data.addresses.arweave;
    } catch (e) {
      console.log(parseColor(colors, 'Error getting bundler address, see more info with the --debug option.', 'red'));
      if (debug) console.log(e);
      process.exit(1);
    }

    // Fund the bundler address
    try {
      // const addy = await blockweave.wallets.jwkToAddress(wallet);
      const tx = await blockweave.createTransaction(
        {
          target: bundlerAddress,
          quantity: blockweave.ar.arToWinston(amount.toString()),
        },
        wallet,
      );

      tx.reward = parseInt(tx.reward, 10).toString();
      await blockweave.transactions.sign(tx, wallet);
      await blockweave.transactions.post(tx);

      console.log(parseColor(colors, `Bundler funded with ${amount.toString()} AR, transaction ID: ${tx.id}`, 'cyan'));
    } catch (e) {
      console.log(parseColor(colors, 'Error funding bundler address, see more info with the --debug option.', 'red'));
      if (debug) console.log(e);
    }

},
};

export default command;

================================================
File: src/commands/help.ts
================================================
import clc from 'cli-color';
import clear from 'clear';
import figlet from 'figlet';
import path from 'path';
import CLI from 'clui';
import ArgumentsInterface from '../faces/arguments';
import noColorsOption from '../options/noColors';
import CommandInterface from '../faces/command';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'help',
aliases: ['h'],
description: 'Show usage help for a command',
options: [noColorsOption],
execute: async (args: ArgumentsInterface): Promise<void> => {
clear();

    const { commands, options, colors } = args;

    console.log(parseColor(colors, figlet.textSync('ARKB', 'Whimsy'), 'yellow'));
    console.log(`Usage: arkb ${parseColor(colors, '[options]', 'cyan')} ${parseColor(colors, '[command]', 'green')}\n`);

    const Line = CLI.Line;
    new Line()
      .column('Options', 40, colors !== false ? [clc.cyan] : undefined)
      .column('Description', 20, colors !== false ? [clc.blackBright] : undefined)
      .fill()
      .output();

    const opts = Array.from(options)
      .filter(([key, opt]) => key !== opt.alias)
      .map(([key, opt]) => {
        const alias = opt.alias ? ` -${opt.alias}` : '';
        const arg = opt.arg ? parseColor(colors, ` <${opt.arg}>`, 'blackBright') : '';
        return [`--${opt.name + alias + arg}`, opt.description];
      });

    for (let i = 0, j = opts.length; i < j; i++) {
      new Line().column(opts[i][0], 40).column(opts[i][1], 50).fill().output();
    }

    const cmds = Array.from(commands)
      .filter(([key, cmd]) => !cmd.aliases || !cmd.aliases.includes(key))
      .map(([key, cmd]) => {
        const aliases = cmd.aliases && cmd.aliases.length > 0 ? ` (${cmd.aliases.join(', ')})` : '';

        let arg = '';
        if (cmd.args && cmd.args.length > 0) {
          for (const a of cmd.args) {
            arg += parseColor(colors, ` <${a}>`, 'blackBright');
          }
        }

        return [cmd.name + aliases + arg, cmd.description];
      });

    console.log('');

    new Line()
      .column('Commands (alias)', 40, colors !== false ? [clc.green] : undefined)
      .column('Description', 20, colors !== false ? [clc.blackBright] : undefined)
      .fill()
      .output();

    for (let i = 0, j = cmds.length; i < j; i++) {
      new Line().column(cmds[i][0], 40).column(cmds[i][1], 60).fill().output();
    }

    console.log(parseColor(colors, '\nExamples', 'magenta'));
    console.log('Without a saved wallet:');
    console.log(
      `  arkb deploy folder${path.sep}path${path.sep} --wallet path${path.sep}to${path.sep}my${path.sep}wallet.json`,
    );

    console.log('\nSaving a wallet:');
    console.log(`  arkb wallet-save path${path.sep}to${path.sep}wallet.json`);
    console.log(`  arkb deploy folder${path.sep}path`);

    console.log('\nCustom index file:');
    console.log(`  arkb deploy folder${path.sep}path --index custom.html`);

    console.log('\nUsing Bundles:');
    console.log('  arkb deploy folder --use-bundler https://node2.bundlr.network');

},
};

export default command;

================================================
File: src/commands/network.ts
================================================
import { debug } from 'console';
import ArgumentsInterface from '../faces/arguments';
import CommandInterface from '../faces/command';
import { numbersForHumans, parseColor, snakeCaseToTitleCase } from '../utils/utils';
import gatewayOption from '../options/gateway';
import timeoutOption from '../options/timeout';
import debugOption from '../options/debug';
import helpOption from '../options/help';
import noColorsOption from '../options/noColors';

const command: CommandInterface = {
name: 'network',
aliases: ['n'],
description: 'Get the current network info',
options: [gatewayOption, timeoutOption, debugOption, helpOption, noColorsOption],
execute: async (args: ArgumentsInterface): Promise<void> => {
const { blockweave, colors } = args;

    try {
      const net = await blockweave.network.getInfo();
      console.log(parseColor(colors, `Network Details for ${blockweave.config.url}\n`, 'green'));
      Object.keys(net).forEach((key) => {
        const value = net[key];
        console.log(
          `${parseColor(colors, snakeCaseToTitleCase(key), 'yellow')}: ${parseColor(
            colors,
            isNaN(value) ? value : numbersForHumans(value),
            'cyan',
          )}`,
        );
      });
    } catch (err) {
      console.log(parseColor(colors, `Unable to reach ${blockweave.config.url} - ${err.message}`, 'red'));
      if (debug) console.log(err);
    }

},
};

export default command;

================================================
File: src/commands/status.ts
================================================
import ArgumentsInterface from '../faces/arguments';
import CommandInterface from '../faces/command';
import { status } from '../lib/status';
import gatewayOption from '../options/gateway';
import timeoutOption from '../options/timeout';
import debugOption from '../options/debug';
import helpOption from '../options/help';
import noColorsOption from '../options/noColors';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'status',
aliases: ['s'],
description: 'Check the status of a transaction ID',
options: [gatewayOption, timeoutOption, debugOption, helpOption, noColorsOption],
args: ['txid'],
usage: ['am2NyCEGnxXBqhUGKL8cAv6wbkGKVtgIcdtv9g9QKG1'],
execute: async (args: ArgumentsInterface): Promise<void> => {
const { commandValues, blockweave, debug, colors } = args;

    if (!commandValues || !commandValues.length) {
      console.log(parseColor(colors, 'Error: Missing transaction ID', 'redBright'));
      return;
    }

    const txid = commandValues[0];
    const arweaveUri = blockweave.config.url;

    try {
      const res = await status(txid, blockweave);

      console.log('🚀 ~ file: status.ts ~ line 20 ~ .then ~ res', res);
      let responseStatus = '';
      switch (res.status) {
        case 200:
          responseStatus = parseColor(colors, '200 - Accepted', 'green');
          break;
        case 202:
          responseStatus = parseColor(colors, '202 - Pending', 'yellow');
          break;
        case 400:
          responseStatus = parseColor(colors, `400 - ${res.errorMessage}`, 'red');
          break;
        case 404:
          responseStatus = parseColor(colors, `404 - Not Found`, 'red');
          break;
        default:
          responseStatus = parseColor(colors, `${res.status} - ${res.errorMessage}`, 'red');
          break;
      }
      console.log(`Trasaction ID: ${parseColor(colors, txid, 'blue')}

Status: ${responseStatus}`);

      if (res.status === 200) {
        console.log(
          ` - Block: ${parseColor(colors, res.blockHeight, 'cyan')}

- Block hash: ${parseColor(colors, res.blockHash, 'cyan')}
- Confirmations: ${parseColor(colors, res.confirmations, 'cyan')}

Transaction URL: ${parseColor(colors, `${arweaveUri}/${txid}`, 'cyan')}
Block URL: ${parseColor(colors, `${arweaveUri}/block/hash/${res.blockHash}`, 'cyan')}

Transaction explorer URL: ${parseColor(colors, `https://viewblock.io/arweave/tx/${txid}`, 'cyan')}
Block explorer URL: ${parseColor(colors, `https://viewblock.io/arweave/block/${res.blockHeight}`, 'cyan')}`,
        );
      }
    } catch (e) {
      console.log(parseColor(colors, `Unable to reach ${blockweave.config.url} - ${e.message}`, 'red'));
if (debug) console.log(e);
}
},
};

export default command;

================================================
File: src/commands/transfer.ts
================================================
import ArgumentsInterface from '../faces/arguments';
import CommandInterface from '../faces/command';
import { getWallet } from '../utils/wallet';
import gatewayOption from '../options/gateway';
import timeoutOption from '../options/timeout';
import walletOption from '../options/wallet';
import debugOption from '../options/debug';
import helpOption from '../options/help';
import noColorsOption from '../options/noColors';
import { isValidWalletAddress, parseColor } from '../utils/utils';
import Transfer from '../lib/transfer';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';

const command: CommandInterface = {
name: 'transfer',
description: 'Send funds to an Arweave wallet',
options: [gatewayOption, timeoutOption, walletOption, debugOption, helpOption, noColorsOption],
args: ['address', 'amount'],
usage: ['am2NyCEGnxXBqhUGKL8cAv6wbkGKVtgIcdtv9g9QKG1 0.01'],
execute: async (args: ArgumentsInterface): Promise<void> => {
const { commandValues, walletPath, feeMultiplier, blockweave, config, debug, colors } = args;

    try {
      const target = commandValues[0].toString();
      const amount = +commandValues[1];

      // Get the wallet
      const wallet: JWKInterface = await getWallet(walletPath, config, debug, colors);
      if (!wallet) {
        console.log(parseColor(colors, 'Please save a wallet or run with the --wallet option.', 'red'));
        return;
      }

      // Check if the target address is valid
      if (!isValidWalletAddress(target)) {
        console.log(parseColor(colors, 'Invalid target wallet address', 'redBright'));
        return;
      }

      // Check if the amount is a positive number
      if (isNaN(amount) || amount <= 0) {
        console.log(parseColor(colors, 'Invalid amount', 'redBright'));
        return;
      }

      // Check if the wallet has enough balance
      const addy = await blockweave.wallets.jwkToAddress(wallet);
      const bal = await blockweave.wallets.getBalance(addy);
      if (+bal < amount) {
        console.log(parseColor(colors, 'Insufficient balance', 'redBright'));
        return;
      }

      const transfer = new Transfer(wallet, blockweave);
      const txid = await transfer.execute(target, amount.toString(), feeMultiplier);

      console.log(parseColor(colors, `Transfer successful! Transaction ID: ${txid}`, 'greenBright'));
    } catch (error) {
      console.log(parseColor(colors, 'Unable to send funds.', 'redBright'));
      if (debug) console.log(error);
    }

},
};

export default command;

================================================
File: src/commands/version.ts
================================================
import ArgumentsInterface from '../faces/arguments';
import CommandInterface from '../faces/command';
import { getPackageVersion } from '../utils/utils';

const command: CommandInterface = {
name: 'version',
aliases: ['v'],
description: 'Show the current arkb version number',
execute: async (\_: ArgumentsInterface): Promise<void> => {
const version = getPackageVersion();
console.log(`v${version}`);
},
};

export default command;

================================================
File: src/commands/walletExport.ts
================================================
import fs from 'fs';
import { getWallet } from '../utils/wallet';
import CommandInterface from '../faces/command';
import ArgumentsInterface from '../faces/arguments';
import noColorsOption from '../options/noColors';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'wallet-export',
aliases: ['we'],
description: `Exports a previously saved wallet`,
options: [noColorsOption],
execute: async (args: ArgumentsInterface): Promise<void> => {
const { config, blockweave, debug, colors } = args;

    const wallet: JWKInterface = await getWallet(null, config, debug, colors);
    if (!wallet) {
      console.log(parseColor(colors, 'Please set a wallet or run with the --wallet option.', 'red'));
      return;
    }

    try {
      const address = await blockweave.wallets.jwkToAddress(wallet);
      fs.writeFileSync(`${address}.json`, JSON.stringify(wallet), 'utf8');
      console.log(
        parseColor(colors, `Wallet "${parseColor(colors, `${address}.json`, 'bold')}" exported successfully.`, 'green'),
      );
    } catch (e) {
      console.log(parseColor(colors, 'Unable to export the wallet file.', 'red'));
      if (debug) console.log(e);
    }

},
};

export default command;

================================================
File: src/commands/walletForget.ts
================================================
import CommandInterface from '../faces/command';
import ArgumentsInterface from '../faces/arguments';
import noColorsOption from '../options/noColors';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'wallet-forget',
aliases: ['wf'],
options: [noColorsOption],
description: `Removes a previously saved wallet`,
execute: async (args: ArgumentsInterface): Promise<void> => {
const { config, debug, colors } = args;

    try {
      config.delete('wallet');
    } catch (e) {
      console.log(parseColor(colors, 'Unable to forget the wallet.', 'red'));
      if (debug) console.log(e);
    }

},
};

export default command;

================================================
File: src/commands/walletSave.ts
================================================
import fs from 'fs';
import cliQuestions from '../utils/cli-questions';
import Crypter from '../utils/crypter';
import CommandInterface from '../faces/command';
import ArgumentsInterface from '../faces/arguments';
import noColorsOption from '../options/noColors';
import path from 'path';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'wallet-save',
aliases: ['ws'],
description: `Saves a wallet, removes the need of the --wallet option`,
args: ['wallet_path'],
usage: [`folder${path.sep}keyfile.json`],
options: [noColorsOption],
execute: async (args: ArgumentsInterface): Promise<void> => {
const { commandValues, config, debug, colors } = args;

    if (!commandValues || !commandValues.length) {
      console.log(parseColor(colors, 'Wallet path is required.', 'redBright'));
      return;
    }

    const walletPath = commandValues[0];
    try {
      const wallet = fs.readFileSync(walletPath, 'utf8');
      const res = await cliQuestions.askWalletPassword('Set a password for your wallet');

      const crypter = new Crypter(res.password);
      const encWallet = crypter.encrypt(Buffer.from(wallet)).toString('base64');

      config.set('wallet', encWallet);
      console.log(parseColor(colors, 'Wallet saved!', 'green'));
    } catch (e) {
      console.log(parseColor(colors, 'Invalid wallet file.', 'red'));
      if (debug) console.log(e);
    }

},
};

export default command;

================================================
File: src/commands/withdrawBundler.ts
================================================
import ArgumentsInterface from '../faces/arguments';
import CommandInterface from '../faces/command';
import { getWallet } from '../utils/wallet';
import walletOption from '../options/wallet';
import debugOption from '../options/debug';
import helpOption from '../options/help';
import timeoutOption from '../options/timeout';
import useBundlerOption from '../options/useBundler';
import noColorsOption from '../options/noColors';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import Transfer from '../lib/transfer';
import { parseColor } from '../utils/utils';

const command: CommandInterface = {
name: 'withdraw-bundler',
description: 'Withdraw from your bundler balance',
args: ['amount'],
usage: ['0.3'],
options: [walletOption, debugOption, helpOption, timeoutOption, useBundlerOption, noColorsOption],
execute: async (args: ArgumentsInterface): Promise<void> => {
const { walletPath, bundler, debug, config, blockweave, commandValues, useBundler, colors } = args;

    // Check if we have received a command value
    if (!commandValues || !commandValues.length) {
      console.log(parseColor(colors, 'You forgot to set the amount.', 'red'));
      return;
    }

    // amount in ar
    const amnt = commandValues[0];
    const amount = parseInt(blockweave.ar.arToWinston(amnt), 10);
    const wallet: JWKInterface = await getWallet(walletPath, config, debug, colors);

    if (!wallet) {
      return;
    }

    if (!useBundler) {
      console.log(parseColor(colors, 'Please set bundler address', 'red'));
      return;
    }

    // Initiate withdrawal
    try {
      const transfer = new Transfer(wallet, blockweave);

      const addy = await transfer.withdrawBundler(bundler, amount);
      if (!addy) {
        console.log(parseColor(colors, 'Error withdrawing to wallet', 'red'));
        return;
      }

      // Success response
      console.log(
        `${parseColor(colors, addy, 'cyan')} has been funded with ${parseColor(colors, `AR ${amnt} from bundler.`)}`,
        'yellow',
      );
    } catch (e) {
      console.log(parseColor(colors, 'Error withdrawing to wallet', 'red'));
      if (debug) console.log(e);
      return;
    }

},
};

export default command;

================================================
File: src/faces/arguments.ts
================================================
import Blockweave from 'blockweave';
import Api from 'arweave/node/lib/api';
import Conf from 'conf';
import minimist from 'minimist';
import Tags from '../lib/tags';
import CommandInterface from './command';
import OptionInterface from './option';

export default interface ArgumentsInterface {
argv: minimist.ParsedArgs;
blockweave: Blockweave;
config: Conf;
debug: boolean;
command: string;
commandValues: string[];
walletPath: string;
index: string;
license: string;
autoConfirm: boolean;
tags: Tags;
bundle: boolean;
useBundler: string;
feeMultiplier: number;
commands: Map<string, CommandInterface>;
options: Map<string, OptionInterface>;
bundler?: Api;
colors: boolean;
contentType: string;
}

================================================
File: src/faces/bundler.ts
================================================
export interface BundlerWithdraw {
publicKey: string;
currency: 'arweave';
amount: number;
nonce: number;
signature: unknown;
}

================================================
File: src/faces/command.ts
================================================
import ArgumentsInterface from './arguments';
import OptionInterface from './option';

export default interface CommandInterface {
name: string;
aliases?: string[];
options?: OptionInterface[];
args?: string[];
usage?: string[];
description: string;
execute: (args: ArgumentsInterface) => Promise<void>;
}

================================================
File: src/faces/option.ts
================================================
import ArgumentsInterface from './arguments';

export default interface OptionInterface {
name: string;
alias?: string;
description: string;
arg?: string;
usage?: string;
}

================================================
File: src/faces/txDetail.ts
================================================
import { FileDataItem } from 'arbundles/file';
import Transaction from 'blockweave/dist/lib/transaction';

export interface TxDetail {
filePath: string;
hash: string;
tx: Transaction | FileDataItem;
type: string;
fileSize?: number;
}

================================================
File: src/lib/deploy.ts
================================================
import fs, { createReadStream } from 'fs';
import path from 'path';
import crypto from 'crypto';
import Blockweave from 'blockweave';
import mime from 'mime';
import clui from 'clui';
import PromisePool from '@supercharge/promise-pool';
import Community from 'community-js';
import { pipeline } from 'stream/promises';
import { TxDetail } from '../faces/txDetail';
import { FileBundle, FileDataItem } from 'arbundles/file';
import Bundler from '../utils/bundler';
import Tags from '../lib/tags';
import { getPackageVersion, parseColor, getTempDir } from '../utils/utils';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import Transaction from 'blockweave/dist/lib/transaction';
import { createTransactionAsync, uploadTransactionAsync } from 'arweave-stream-tx';
import Arweave from 'arweave';
import ArweaveTransaction from 'arweave/node/lib/transaction';
import Cache from '../utils/cache';

export default class Deploy {
private wallet: JWKInterface;
private blockweave: Blockweave;
private arweave: Arweave;
private bundler: Bundler;
private cache: Cache;
private txs: TxDetail[];
private duplicates: { hash: string; id: string; filePath: string }[] = [];

private community: Community;

private bundle: FileBundle;
private bundledTx: Transaction;

constructor(
wallet: JWKInterface,
blockweave: Blockweave,
public readonly debug: boolean = false,
public readonly threads: number = 0,
public readonly logs: boolean = true,
public readonly localBundle: boolean = false,
) {
this.wallet = wallet;
this.blockweave = blockweave;

    this.arweave = Arweave.init({
      host: blockweave.config.host,
      port: blockweave.config.port,
      protocol: blockweave.config.protocol,
      timeout: blockweave.config.timeout,
      logging: blockweave.config.logging,
    });

    this.cache = new Cache(
      debug,
      this.arweave.getConfig().api.host === 'localhost' || this.arweave.getConfig().api.host === '127.0.0.1',
    );
    this.bundler = new Bundler(wallet, this.blockweave);

    try {
      // @ts-ignore
      this.community = new Community(blockweave, wallet);

      // tslint:disable-next-line: no-empty
    } catch {}

}

getBundler(): Bundler {
return this.bundler;
}

getBundle(): FileBundle {
return this.bundle;
}

getBundledTx(): Transaction {
return this.bundledTx;
}

async prepare(
dir: string,
files: string[],
index: string = 'index.html',
tags: Tags = new Tags(),
contentType: string,
license?: string,
useBundler?: string,
feeMultiplier?: number,
forceRedeploy: boolean = false,
colors: boolean = true,
) {
this.txs = [];

    if (typeof license === 'string' && license.length > 0) {
      tags.addTag('License', license);
    }

    if (useBundler) {
      tags.addTag('Bundler', useBundler);
      tags.addTag('Bundle', 'ans104');
    }

    let leftToPrepare = files.length;
    let countdown: clui.Spinner;
    if (this.logs) {
      countdown = new clui.Spinner(`Preparing ${leftToPrepare} files...`, ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
      countdown.start();
    }

    // ignore arkb manifest file
    await PromisePool.for(files.filter((f) => !f.includes('manifest.arkb')))
      .withConcurrency(this.threads)
      .process(async (filePath: string) => {
        if (this.logs) countdown.message(`Preparing ${leftToPrepare--} files...`);

        let data: Buffer;
        try {
          data = fs.readFileSync(filePath);
        } catch (e) {
          console.log('Unable to read file ' + filePath);
          throw new Error(`Unable to read file: ${filePath}`);
        }

        if (!data || !data.length) {
          return;
        }

        const hash = await this.toHash(data);

        if (!forceRedeploy && this.cache.has(hash)) {
          const cached = this.cache.get(hash);
          let confirmed = cached.confirmed;

          if (!confirmed) {
            // tslint:disable-next-line: no-empty
            const res = await this.arweave.api.get(`tx/${cached.id}/status`).catch(() => {});
            if (res && res.data && res.data.number_of_confirmations) {
              confirmed = true;
            }
          }

          if (confirmed) {
            this.cache.set(hash, { ...cached, confirmed: true });

            this.duplicates.push({
              hash,
              id: cached.id,
              filePath,
            });
            return;
          }
        }

        const type = contentType || mime.getType(filePath) || 'application/octet-stream';

        const newTags = new Tags();
        for (const tag of tags.tags) {
          newTags.addTag(tag.name, tag.value);
        }

        newTags.addTag('User-Agent', `arkb`);
        newTags.addTag('User-Agent-Version', getPackageVersion());
        newTags.addTag('Type', 'file');
        if (type) newTags.addTag('Content-Type', type);
        newTags.addTag('File-Hash', hash);

        let tx: Transaction | FileDataItem;
        let fileSize: number;
        if (useBundler || this.localBundle) {
          tx = await this.bundler.createItem(data, newTags.tags);
          // get file size since bundler doesn't contain data_size
          ({ size: fileSize } = fs.statSync(filePath));
        } else {
          tx = await this.buildTransaction(filePath, newTags);
          fileSize = parseInt(tx.data_size, 10);
          if (feeMultiplier && feeMultiplier > 1) {
            (tx as Transaction).reward = parseInt(
              (feeMultiplier * +(tx as Transaction).reward).toString(),
              10,
            ).toString();
          }
        }

        this.cache.set(hash, {
          id: tx.id,
          confirmed: false,
        });

        this.txs.push({ filePath, hash, tx, type, fileSize });
      });

    if (this.logs) countdown.stop();

    const isFile = this.txs.length === 1 && this.txs[0].filePath === dir;

    if (isFile && this.duplicates.length) {
      console.log(parseColor(colors, 'File already deployed:', 'red'));

      console.log('Arweave: ' + parseColor(colors, `${this.blockweave.config.url}/${this.duplicates[0].id}`, 'cyan'));
      return;
    }

    if (this.logs) {
      countdown = new clui.Spinner(`Building manifest...`, ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
      countdown.start();
    }

    // Don't allow manifest build
    if (!isFile) await this.buildManifest(dir, index, tags, useBundler, feeMultiplier);

    if (this.logs) countdown.stop();

    if (useBundler || this.localBundle) {
      this.bundle = await this.bundler.bundleAndSign(this.txs.map((t) => t.tx) as FileDataItem[]);

      this.bundledTx = (await this.bundle.toTransaction({}, this.arweave, this.wallet)) as any;

      await this.arweave.transactions.sign(this.bundledTx as unknown as ArweaveTransaction, this.wallet);
    }

    return this.txs;

}

async deploy(isFile: boolean = false, useBundler?: string, colors: boolean = true): Promise<string> {
let cTotal = this.localBundle ? 1 : this.txs.length;

    let countdown: clui.Spinner;
    if (this.logs) {
      countdown = new clui.Spinner(`Deploying ${cTotal} file${cTotal === 1 ? '' : 's'}...`, [
        '⣾',
        '⣽',
        '⣻',
        '⢿',
        '⡿',
        '⣟',
        '⣯',
        '⣷',
      ]);
      countdown.start();
    }

    let txid = this.txs[0].tx.id;
    if (!isFile) {
      for (let i = 0, j = this.txs.length; i < j; i++) {
        if (this.txs[i].filePath === '' && this.txs[i].hash === '') {
          txid = this.txs[i].tx.id;
          break;
        }
      }
    }

    try {
      const res = await this.arweave.api.get('cEQLlWFkoeFuO7dIsdFbMhsGPvkmRI9cuBxv0mdn0xU');
      if (!res || res.status !== 200) {
        throw new Error('Unable to get cEQLlWFkoeFuO7dIsdFbMhsGPvkmRI9cuBxv0mdn0xU');
      }

      await this.community.setCommunityTx('cEQLlWFkoeFuO7dIsdFbMhsGPvkmRI9cuBxv0mdn0xU');
      const target = await this.community.selectWeightedHolder();

      if (target && (await this.blockweave.wallets.jwkToAddress(this.wallet)) !== target) {
        let fee: number;
        if (useBundler || this.localBundle) {
          fee = +this.bundledTx.reward;
        } else {
          fee = this.txs.reduce((a, txData) => a + +(txData.tx as Transaction).reward, 0);
        }

        const quantity = parseInt((fee * 0.1).toString(), 10).toString();
        if (target.length) {
          const tx = await this.blockweave.createTransaction(
            {
              target,
              quantity,
            },
            this.wallet,
          );

          let files = `${cTotal} file${isFile ? '' : 's'}`;
          if (useBundler) {
            files = `${cTotal} data item${isFile ? '' : 's'}`;
          }

          let actionMessage = `Deployed ${files} on https://arweave.net/${txid}`;
          if (this.localBundle) {
            actionMessage = `Deployed a bundle with ${files}, bundle ID ${this.bundledTx.id} on https://arweave.net/${txid}`;
          }

          tx.addTag('Action', 'Deploy');
          tx.addTag('Message', actionMessage);
          tx.addTag('Service', 'arkb');
          tx.addTag('App-Name', 'arkb');
          tx.addTag('App-Version', getPackageVersion());

          await tx.signAndPost();
        }
      }
      // tslint:disable-next-line: no-empty
    } catch {}

    let toDeploy: TxDetail[] = this.txs;
    if (this.localBundle) {
      const hash = await this.toHash(await this.bundle.getRaw());
      toDeploy = [
        {
          filePath: '',
          hash,
          tx: this.bundledTx,
          type: 'Bundle',
        },
      ];
    }

    await PromisePool.for(toDeploy)
      .withConcurrency(this.threads)
      .process(async (txData) => {
        if (this.logs) countdown.message(`Deploying ${cTotal--} files...`);
        let deployed = false;

        if (useBundler) {
          try {
            await this.bundler.post(txData.tx as FileDataItem, useBundler);
            deployed = true;
          } catch (e) {
            console.log(e);
            console.log(parseColor(colors, 'Failed to deploy data item: ' + txData.filePath, 'red'));
          }
        } else if (this.localBundle) {
          console.log('inside');
          const txRes = await this.bundle.signAndSubmit(this.arweave, this.wallet);
          console.log(txRes);
          deployed = true;
        }

        if (txData.filePath === '' && txData.hash === '') {
          await (txData.tx as Transaction).post(0);
          deployed = true;
        }

        if (!deployed) {
          try {
            await pipeline(
              createReadStream(txData.filePath),
              // @ts-ignore
              uploadTransactionAsync(txData.tx as Transaction, this.blockweave),
            );
            deployed = true;
          } catch (e) {
            if (this.debug) {
              console.log(e);
              console.log(
                parseColor(
                  colors,
                  `Failed to upload ${txData.filePath} using uploadTransactionAsync, trying normal upload...`,
                  'red',
                ),
              );
            }
          }
        }

        if (!deployed) {
          try {
            await (txData.tx as Transaction).post(0);
            deployed = true;
          } catch (e) {
            if (this.debug) {
              console.log(e);
              console.log(parseColor(colors, `Failed to upload ${txData.filePath} using normal post!`, 'red'));
            }
          }
        }
      });

    if (this.logs) countdown.stop();
    await this.cache.save(colors);

    // save manifest.arkb to user dir
    if (!isFile) {
      const dir = this.txs[0].filePath || this.txs[1].filePath;
      const {
        tx: { id },
      } = this.txs.find((i) => i.type === 'application/x.arweave-manifest+json');
      // non-necessary: but add check incase of funny/unexpected behavior
      if (id) {
        // find manifest json from temp dir
        const mPath = path.resolve(getTempDir(), `${id}.manifest.json`);
        try {
          fs.copyFileSync(mPath, path.join(path.dirname(dir), 'manifest.arkb'));
        } catch (e) {
          /* */
        }
      }
    }
    return txid;

}

private async buildTransaction(filePath: string, tags: Tags): Promise<Transaction> {
const tx = await pipeline(createReadStream(filePath), createTransactionAsync({}, this.arweave, this.wallet));
tags.addTagsToTransaction(tx);
await this.arweave.transactions.sign(tx, this.wallet);

    // @ts-ignore
    return tx;

}

private async buildManifest(
dir: string,
index: string = null,
tags: Tags,
useBundler: string,
feeMultiplier: number,
) {
const { results: pDuplicates } = await PromisePool.for(this.duplicates)
.withConcurrency(this.threads)
.process(async (txD) => {
const filePath = txD.filePath.split(`${dir}/`)[1];
return [filePath, { id: txD.id }];
});

    const { results: pTxs } = await PromisePool.for(this.txs)
      .withConcurrency(this.threads)
      .process(async (txD) => {
        const filePath = txD.filePath.split(`${dir}/`)[1];
        return [filePath, { id: txD.tx.id }];
      });

    const paths = pDuplicates.concat(pTxs).reduce((acc, cur) => {
      // @ts-ignore
      acc[cur[0]] = cur[1];
      return acc;
    }, {});

    if (!index) {
      if (Object.keys(paths).includes('index.html')) {
        index = 'index.html';
      } else {
        index = Object.keys(paths)[0];
      }
    } else {
      if (!Object.keys(paths).includes(index)) {
        index = Object.keys(paths)[0];
      }
    }

    const data = {
      manifest: 'arweave/paths',
      version: '0.1.0',
      index: {
        path: index,
      },
      paths,
    };

    tags.addTag('Type', 'manifest');
    tags.addTag('Content-Type', 'application/x.arweave-manifest+json');

    let tx: Transaction | FileDataItem;
    if (useBundler || this.localBundle) {
      tx = await this.bundler.createItem(JSON.stringify(data), tags.tags);
    } else {
      tx = await this.blockweave.createTransaction(
        {
          data: JSON.stringify(data),
        },
        this.wallet,
      );
      tags.addTagsToTransaction(tx as Transaction);
      if (feeMultiplier) {
        (tx as Transaction).reward = parseInt((feeMultiplier * +(tx as Transaction).reward).toString(), 10).toString();
      }
      await tx.sign();
    }

    this.txs.push({ filePath: '', hash: '', tx, type: 'application/x.arweave-manifest+json' });

    // store manifest in temp folder for later reuse
    try {
      fs.writeFileSync(path.join(getTempDir(), `${tx.id}.manifest.json`), JSON.stringify(data));
    } catch (e) {
      /* */
    }

    return true;

}

private async toHash(data: Buffer): Promise<string> {
const hash = crypto.createHash('sha256');
hash.update(data);
return hash.digest('hex');
}
}

================================================
File: src/lib/status.ts
================================================
import Blockweave from 'blockweave';

export async function status(
txid: string,
blockweave: Blockweave,
): Promise<{ status: number; blockHeight: number; blockHash: string; confirmations: number; errorMessage?: string }> {
const res = await blockweave.api.get(txid);
if (res.status !== 200 && res.status !== 202) {
return { status: res.status, blockHeight: -1, blockHash: '', confirmations: -1, errorMessage: res.data };
}

const { data } = await blockweave.api.get(`tx/${txid}/status`);
return {
blockHeight: data.block_height,
blockHash: data.block_indep_hash,
confirmations: data.number_of_confirmations,
status: res.status,
};
}

================================================
File: src/lib/tags.ts
================================================
import Transaction from 'blockweave/dist/lib/transaction';

export default class Tags {
private \_tags: Map<string, string> = new Map();

public get tags(): { name: string; value: string }[] {
return Array.from(this.\_tags.entries()).map(([name, value]) => ({ name, value }));
}

public addTag(key: string, value: string): void {
this.\_tags.set(key, value);
}

public addTags(tags: { name: string; value: string }[]): void {
tags.forEach(({ name, value }) => this.addTag(name, value));
}

public addTagsToTransaction(tx: any): void {
this.tags.forEach(({ name, value }) => tx.addTag(name, value));
}
}

================================================
File: src/lib/transfer.ts
================================================
import Blockweave from 'blockweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import Community from 'community-js';
import { getPackageVersion } from '../utils/utils';
import Api from 'arweave/node/lib/api';
import { BundlerWithdraw } from '../faces/bundler';
import { deepHash } from 'arbundles';
import { stringToBuffer } from 'blockweave/dist/utils/buffer';

export default class Transfer {
private community: Community;

constructor(private readonly wallet: JWKInterface, private readonly blockweave: Blockweave) {
try {
// @ts-ignore
this.community = new Community(blockweave, wallet);
// tslint:disable-next-line: no-empty
} catch (e) {}
}

async execute(target: string, amount: string, feeMultiplier: number = 1): Promise<string> {
const tx = await this.blockweave.createTransaction(
{
target,
quantity: this.blockweave.ar.arToWinston(amount),
},
this.wallet,
);

    tx.addTag('User-Agent', `arkb`);
    tx.addTag('User-Agent-Version', getPackageVersion());
    tx.addTag('Type', 'transfer');

    await this.blockweave.transactions.sign(tx, this.wallet);

    if (feeMultiplier && feeMultiplier > 1) {
      tx.reward = parseInt((feeMultiplier * +tx.reward).toString(), 10).toString();
    }

    try {
      await this.community.setCommunityTx('cEQLlWFkoeFuO7dIsdFbMhsGPvkmRI9cuBxv0mdn0xU');
      const feeTarget = await this.community.selectWeightedHolder();

      if ((await this.blockweave.wallets.jwkToAddress(this.wallet)) !== feeTarget) {
        const quantity = parseInt((+tx.reward * 0.1).toString(), 10).toString();
        if (feeTarget.length) {
          const feeTx = await this.blockweave.createTransaction(
            {
              target: feeTarget,
              quantity,
            },
            this.wallet,
          );

          feeTx.addTag('Action', 'Transfer');
          feeTx.addTag('Message', `Transferred AR to ${target}`);
          feeTx.addTag('Service', 'arkb');
          feeTx.addTag('App-Name', 'arkb');
          feeTx.addTag('App-Version', getPackageVersion());

          await feeTx.signAndPost(this.wallet, undefined, 0);
        }
      }
      // tslint:disable-next-line: no-empty
    } catch {}

    const txid = tx.id;
    await tx.post(0);

    return txid;

}

async withdrawBundler(bundler: Api, amount: number) {
const addy = await this.blockweave.wallets.jwkToAddress(this.wallet);

    const response = await bundler.get(`/account/withdrawals?address=${addy}`);
    const nonce = response.data as number;

    const data: BundlerWithdraw = {
      publicKey: addy,
      currency: 'arweave',
      amount,
      nonce,
      signature: undefined,
    };

    const hash = await deepHash([
      stringToBuffer(data.currency),
      stringToBuffer(data.amount.toString()),
      stringToBuffer(data.nonce.toString()),
    ]);
    data.signature = await this.blockweave.crypto.sign(this.wallet, hash);

    await bundler.post('/account/withdraw', data);

    return addy;

}
}

================================================
File: src/options/autoConfirm.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'auto-confirm',
description: 'Skips the confirm screen',
};

export default option;

================================================
File: src/options/bundle.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'bundle',
description: 'Locally bundle your files and deploy to Arweave',
};

export default option;

================================================
File: src/options/concurrency.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'concurrency',
alias: 'c',
description: 'Multi thread, default is 5',
arg: 'number',
usage: '5',
};

export default option;

================================================
File: src/options/contentType.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'content-type',
description: 'Set the files content type',
arg: 'content type',
};

export default option;

================================================
File: src/options/debug.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'debug',
description: 'Display log messages',
};

export default option;

================================================
File: src/options/feeMultiplier.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'fee-multiplier',
alias: 'm',
description: 'Set the fee multiplier for all transactions',
arg: 'number',
usage: '1',
};

export default option;

================================================
File: src/options/force.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'force',
alias: 'f',
description: 'Force a redeploy of all the files',
};

export default option;

================================================
File: src/options/gateway.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'gateway',
alias: 'g',
description: 'Set the gateway hostname or ip address',
arg: 'host_or_ip',
usage: 'https://arweave.net',
};

export default option;

================================================
File: src/options/help.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'help',
alias: 'h',
description: 'Show usage help for a command',
};

export default option;

================================================
File: src/options/index.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'index',
alias: 'i',
description: 'Set path manifest index for a directory upload',
};

export default option;

================================================
File: src/options/license.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'license',
description: 'Specify the license of your upload with an spdx license identifier',
arg: 'spdx',
usage: 'CC BY-4.0',
};

export default option;

================================================
File: src/options/noColors.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'no-colors',
description: 'Print to terminal without fancy colors',
};

export default option;

================================================
File: src/options/tagName.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'tag-name',
description: 'Set a tag name',
arg: 'name',
usage: 'My-Tag-Name',
};

export default option;

================================================
File: src/options/tagValue.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'tag-value',
description: 'Set a tag value',
arg: 'value',
usage: 'myValue',
};

export default option;

================================================
File: src/options/timeout.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'timeout',
alias: 't',
description: 'Set the request timeout',
arg: 'number',
usage: '20000',
};

export default option;

================================================
File: src/options/useBundler.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'use-bundler',
description: 'Use an ans104 bundler',
arg: 'host_or_ip',
usage: 'https://node2.bundlr.network',
};

export default option;

================================================
File: src/options/wallet.ts
================================================
import OptionInterface from '../faces/option';

const option: OptionInterface = {
name: 'wallet',
alias: 'w',
description: 'Set the key file path',
arg: 'wallet_path',
usage: 'path_to_keyfile.json',
};

export default option;

================================================
File: src/utils/bundler.ts
================================================
import { ArweaveSigner } from 'arbundles/src/signing';
import { createData, bundleAndSignData, FileDataItem } from 'arbundles/file';
import Blockweave from 'blockweave';
import { AxiosResponse } from 'axios';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import Api from 'arweave/node/lib/api';

export default class Bundler {
private signer: ArweaveSigner;
private blockweave: Blockweave;

constructor(wallet: JWKInterface, blockweave: Blockweave) {
this.signer = new ArweaveSigner(wallet);
this.blockweave = blockweave;
}

async createItem(data: Buffer | string, tags: { name: string; value: string }[] = []): Promise<FileDataItem> {
const item = await createData(data, this.signer, {
tags,
});

    await item.sign(this.signer);
    return item;

}

async bundleAndSign(txs: FileDataItem[]) {
return bundleAndSignData(txs, this.signer);
}

async post(tx: FileDataItem, bundler: string): Promise<AxiosResponse<any>> {
return tx.sendToBundler(bundler);
}

static async getAddressBalance(bundler: Api, address: string): Promise<number> {
const res = await bundler.get(`/account/balance?address=${address}`);
return res.data.balance || 0;
}
}

================================================
File: src/utils/cache.ts
================================================
import fs from 'fs';
import path from 'path';
import { parseColor } from './utils';

export interface CacheDataInterface {
id: string;
confirmed: boolean;
}

export default class Cache {
private cache: Map<string, CacheDataInterface>;
private cacheFile: string = path.join(\_\_dirname, '..', '..', 'cached.json');

constructor(public readonly debug: boolean = false, public readonly isArLocal: boolean) {
if (this.isArLocal) {
this.cacheFile = path.join(\_\_dirname, '..', '..', 'cached-arlocal.json');
}

    this.cache = new Map();

    if (fs.existsSync(this.cacheFile)) {
      try {
        const entries = JSON.parse(fs.readFileSync(this.cacheFile, 'utf8'));
        for (const [key, value] of entries) {
          this.cache.set(key, value);
        }
        // tslint:disable-next-line: no-empty
      } catch (e) {}
    }

}

public get(key: string): CacheDataInterface {
return this.cache.get(key);
}

public set(key: string, value: CacheDataInterface): void {
this.cache.set(key, value);
}

public has(key: string): boolean {
return this.cache.has(key);
}

public delete(key: string): void {
this.cache.delete(key);
}

public clear(): void {
this.cache.clear();
}

public size(): number {
return this.cache.size;
}

public save(colors?: boolean): Promise<void> {
return new Promise((resolve, reject) => {
fs.writeFile(this.cacheFile, JSON.stringify(this.entries()), 'utf8', (err) => {
if (err) {
if (this.debug) {
console.log(parseColor(colors, 'Error saving cache: ' + err.message, 'red'));
reject(err);
}
}

        resolve();
      });
    });

}

public keys(): string[] {
return Array.from(this.cache.keys());
}

public values(): CacheDataInterface[] {
return Array.from(this.cache.values());
}

public entries(): [string, CacheDataInterface][] {
return Array.from(this.cache.entries());
}
}

================================================
File: src/utils/cli-questions.ts
================================================
import clc from 'cli-color';
import inquirer from 'inquirer';

const cliQuestions = {
askWalletPassword: (message = 'Type your password') => {
return inquirer.prompt([
{
name: 'password',
type: 'password',
message,
validate: (val: string) => {
if (val.length) {
return true;
}

          return 'Please enter a password';
        },
      },
    ]);

},
showConfirm: () => {
return inquirer.prompt([
{
name: 'confirm',
type: 'confirm',
message: clc.greenBright('Carefully check the above details are correct, then confirm to complete this upload'),
},
]);
},
};

export default cliQuestions;

================================================
File: src/utils/createTransactionAsync.ts
================================================
import Blockweave from 'blockweave';
import { CreateTransactionInterface } from 'blockweave/dist/faces/blockweave';
import { TransactionInterface } from 'blockweave/dist/faces/lib/transaction';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import Transaction from 'blockweave/dist/lib/transaction';
import { bufferTob64Url } from 'blockweave/dist/utils/buffer';
import { pipeline } from 'stream/promises';
import { generateTransactionChunksAsync } from './generateTransactionChunksAsync';

export function createTransactionAsync(
attributes: Partial<Omit<CreateTransactionInterface, 'data'>>,
blockweave: Blockweave,
jwk: JWKInterface | null | undefined,
) {
return async (source: AsyncIterable<Buffer>): Promise<Transaction> => {
const chunks = await pipeline(source, generateTransactionChunksAsync());

    const txAttrs = Object.assign({}, attributes);

    txAttrs.owner ??= jwk?.n;
    txAttrs.last_tx ??= await blockweave.transactions.getTransactionAnchor();

    const lastChunk = chunks.chunks[chunks.chunks.length - 1];
    const dataByteLength = lastChunk.maxByteRange;

    txAttrs.reward ??= await blockweave.transactions.getPrice(dataByteLength, txAttrs.target);

    txAttrs.data_size = dataByteLength.toString();

    const tx = new Transaction(txAttrs as TransactionInterface, blockweave, jwk);

    tx.chunks = chunks;
    tx.data_root = bufferTob64Url(chunks.data_root);

    return tx;

};
}

================================================
File: src/utils/crypter.ts
================================================
import crypto from 'crypto';

export default class Crypter {
private passphrase: string = '';

constructor(password: string) {
this.passphrase = password;
}

encrypt(data: Buffer): Buffer {
const key = crypto.pbkdf2Sync(this.passphrase, 'salt', 100000, 32, 'sha256');
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);
const encrypted = Buffer.concat([iv, cipher.update(data), cipher.final()]);

    return encrypted;

}

decrypt(encrypted: Buffer): Buffer {
try {
const algorithm = 'aes-256-cbc';
const key = crypto.pbkdf2Sync(this.passphrase, 'salt', 100000, 32, 'sha256');
const iv = encrypted.slice(0, 16);
const data = encrypted.slice(16);
const decipher = crypto.createDecipheriv(algorithm, key, iv);
const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);

      return decrypted;
    } catch (error) {
      throw new Error('Failed to decrypt');
    }

}
}

================================================
File: src/utils/deploy.ts
================================================
import path from 'path';
import normalize from 'normalize-path';
import { dirExists, getUserDirectory, parseColor } from './utils';

export function getDeployPath(commandValues: string[], colors?: boolean): string {
// Check if we have received a command value
if (!commandValues || !commandValues.length) {
console.log(parseColor(colors, 'You forgot to set the directory or file that you want to deploy.', 'red'));
process.exit(0);
}

const commandValue = commandValues[0];
// Use resolve instead of join to get orignal path
let dir = path.resolve(getUserDirectory(), commandValue.replace(/[\/\\]$/, ''));
// Normalize for os differences
dir = normalize(dir);

// Check if deploy dir exists
if (!dirExists(dir)) {
dir = normalize(commandValue.replace(/[\/\\]$/, ''));
if (!dirExists(dir)) {
console.log(parseColor(colors, `The directory or file does not exist.`, 'red'));
process.exit(0);
}
}

return dir;
}

================================================
File: src/utils/generateTransactionChunksAsync.ts
================================================
import chunker from 'stream-chunker';
import Transaction from 'blockweave/dist/lib/transaction';
import { pipeline } from 'stream/promises';
import Blockweave from 'blockweave';
import { Chunk } from 'blockweave/dist/faces/utils/merkle';
import Merkle, { MAX_CHUNK_SIZE, MIN_CHUNK_SIZE } from 'blockweave/dist/utils/merkle';

const merkle = new Merkle();

/\*\*

- Generates the Arweave transaction chunk information from the piped data stream.
  \*/
  export function generateTransactionChunksAsync() {
  return async (source: AsyncIterable<Buffer>): Promise<NonNullable<Transaction['chunks']>> => {
  const chunks: Chunk[] = [];

      /**
       * @param chunkByteIndex the index the start of the specified chunk is located at within its original data stream.
       */
      async function addChunk(chunkByteIndex: number, chunk: Buffer): Promise<Chunk> {
        const dataHash = await Blockweave.crypto.hash(chunk);

        const chunkRep = {
          dataHash,
          minByteRange: chunkByteIndex,
          maxByteRange: chunkByteIndex + chunk.byteLength,
        };

        chunks.push(chunkRep);

        return chunkRep;
      }

      let chunkStreamByteIndex = 0;
      let previousDataChunk: Buffer | undefined;
      let expectChunkGenerationCompleted = false;

      await pipeline(source, chunker(MAX_CHUNK_SIZE, { flush: true }), async (chunkedSource: AsyncIterable<Buffer>) => {
        for await (const chunk of chunkedSource) {
          if (expectChunkGenerationCompleted) {
            throw Error('Expected chunk generation to have completed.');
          }

          if (chunk.byteLength >= MIN_CHUNK_SIZE && chunk.byteLength <= MAX_CHUNK_SIZE) {
            await addChunk(chunkStreamByteIndex, chunk);
          } else if (chunk.byteLength < MIN_CHUNK_SIZE) {
            if (previousDataChunk) {
              // If this final chunk is smaller than the minimum chunk size, rebalance this final chunk and
              // the previous chunk to keep the final chunk size above the minimum threshold.
              const remainingBytes = Buffer.concat(
                [previousDataChunk, chunk],
                previousDataChunk.byteLength + chunk.byteLength,
              );
              const rebalancedSizeForPreviousChunk = Math.ceil(remainingBytes.byteLength / 2);

              const previousChunk = chunks.pop()!;
              const rebalancedPreviousChunk = await addChunk(
                previousChunk.minByteRange,
                remainingBytes.slice(0, rebalancedSizeForPreviousChunk),
              );

              await addChunk(rebalancedPreviousChunk.maxByteRange, remainingBytes.slice(rebalancedSizeForPreviousChunk));
            } else {
              // This entire stream should be smaller than the minimum chunk size, just add the chunk in.
              await addChunk(chunkStreamByteIndex, chunk);
            }

            expectChunkGenerationCompleted = true;
          } else if (chunk.byteLength > MAX_CHUNK_SIZE) {
            throw Error('Encountered chunk larger than max chunk size.');
          }

          chunkStreamByteIndex += chunk.byteLength;
          previousDataChunk = chunk;
        }
      });

      const leaves = await merkle.generateLeaves(chunks);
      const root = await merkle.buildLayers(leaves);
      const proofs = merkle.generateProofs(root);

      return {
        data_root: root.id,
        chunks,
        proofs,
      };

  };
  }

================================================
File: src/utils/showDeployDetails.ts
================================================
import CLI from 'clui';
import clc from 'cli-color';
import { FileBundle, FileDataItem } from 'arbundles/file';
import path from 'path';
import { TxDetail } from '../faces/txDetail';
import Bundler from './bundler';
import Blockweave from 'blockweave';
import { bytesForHumans, parseColor } from './utils';
import Transaction from 'blockweave/dist/lib/transaction';
import { JWKInterface } from 'blockweave/dist/faces/lib/wallet';
import Api from 'arweave/node/lib/api';

export async function showDeployDetails(
txs: TxDetail[],
wallet: JWKInterface,
isFile: boolean = false,
dir: string,
blockweave: Blockweave,
useBundler?: string,
bundler?: Bundler,
license?: string,
bundlerApi?: Api,
bundled?: {
tx: Transaction;
bundle: FileBundle;
},
colors?: boolean,
): Promise<number> {
let totalSize = 0;
let deployFee = 0;

// check if all files satisfy for free bundler deploy
// is free bundler deploy variable
const ifd = !txs.some((tx) => tx.fileSize > 100 \* 1000);

const Line = CLI.Line;
new Line()
.column('ID', 45, colors !== false ? [clc.cyan] : undefined)
.column('Size', 15, colors !== false ? [clc.cyan] : undefined)
.column('Fee', 17, colors !== false ? [clc.cyan] : undefined)
.column('Type', 30, colors !== false ? [clc.cyan] : undefined)
.column('Path', 20, colors !== false ? [clc.cyan] : undefined)
.fill()
.output();

for (let i = 0, j = txs.length; i < j; i++) {
const tx = txs[i];

    let ar = '-';
    const reward = (tx.tx as Transaction).reward;
    if (reward) {
      ar = blockweave.ar.winstonToAr(reward);
      deployFee += +reward;
    }

    let size = '-';
    const dataSize = tx.fileSize || (tx.tx as Transaction).data_size;
    if (dataSize) {
      size = bytesForHumans(+dataSize);
      totalSize += +dataSize;
    }

    let filePath = tx.filePath;
    if (filePath.startsWith(`${dir}/`)) {
      filePath = filePath.split(`${dir}/`)[1];
    }

    if (!filePath) {
      filePath = '';
    }

    new Line()
      .column(tx.tx.id, 45)
      .column(size, 15)
      .column(ar, 17)
      .column(tx.type, 30)
      .column(filePath, 20)
      .fill()
      .output();

}

if (bundled.tx) {
const size = bundled.tx.data_size;
// total size should be size of bundle
// not accumulated
totalSize = +size;

    const reward = bundled.tx.reward;
    const ar = blockweave.ar.winstonToAr(reward);

    // deployFee should be only reward of bundle
    // not accumulated
    deployFee = +reward;

    new Line()
      .column(bundled.tx.id, 45)
      .column(bytesForHumans(+size), 15)
      .column(ifd ? '-' : ar, 17)
      .column('Bundle', 30)
      .column('-', 20)
      .fill()
      .output();

}

let fee = parseInt((deployFee _ 0.1).toString(), 10);
if (useBundler) {
// calculate fee with 30% + 10%
fee = parseInt((deployFee _ 0.4).toString(), 10);
}

let arFee = blockweave.ar.winstonToAr(deployFee.toString());
let serviceFee = blockweave.ar.winstonToAr(fee.toString());
let totalFee = blockweave.ar.winstonToAr((deployFee + fee).toString());

if (useBundler && ifd) {
arFee = '0';
serviceFee = '0';
totalFee = '0';
}

console.log('');
console.log(parseColor(colors, 'Summary', 'cyan'));
if (license) {
console.log(`License: ${license}`);
}

if (useBundler) {
console.log(`Data items to deploy: ${isFile ? '1' : `${txs.length - 1} + 1 manifest`}`);
  } else if (bundled) {
    console.log(`All items will be deployed in a single bundle`);
  } else {
    console.log(`Files to deploy: ${isFile ? '1' : `${txs.length - 1} + 1 manifest`}`);
}

console.log(`Total size: ${bytesForHumans(totalSize)}`);
console.log(`Fees: ${arFee} + ${serviceFee} (10% arkb fee ${useBundler ? '+ 30% Bundlr fee' : ''})`);
console.log(`Total fee: ${totalFee}`);

const addy = await blockweave.wallets.jwkToAddress(wallet);
let winston: string;

if (useBundler) {
const balance = await Bundler.getAddressBalance(bundlerApi, addy);
winston = balance.toString();
} else {
winston = await blockweave.wallets.getBalance(addy);
}

const bal = blockweave.ar.winstonToAr(winston);
const balAfter = +bal - +totalFee;

console.log('');
console.log(parseColor(colors, 'Wallet', 'cyan'));
console.log(`Address: ${addy}`);
console.log(`Current balance: ${bal}`);
console.log(`Balance after deploy: ${balAfter}`);

console.log('');

return +balAfter;
}

================================================
File: src/utils/uploadTransactionAsync.ts
================================================
import Blockweave from 'blockweave';
import Transaction from 'blockweave/dist/lib/transaction';
import { b64UrlToBuffer, bufferTob64Url } from 'blockweave/dist/utils/buffer';
import { pipeline } from 'stream/promises';
import chunker from 'stream-chunker';
import { backOff } from 'exponential-backoff';
import Merkle, { MAX_CHUNK_SIZE } from 'blockweave/dist/utils/merkle';
// Copied from `arweave-js`.
const FATAL_CHUNK_UPLOAD_ERRORS = [
'invalid_json',
'chunk_too_big',
'data_path_too_big',
'offset_too_big',
'data_size_too_big',
'chunk_proof_ratio_not_attractive',
'invalid_proof',
];

interface ChunkUploadPayload {
data_root: string;
data_size: string;
data_path: string;
offset: string;
chunk: string;
}

const MAX_CONCURRENT_CHUNK_UPLOAD_COUNT = 128;

const merkle = new Merkle();

/\*\*

- Uploads the piped data to the specified transaction.
-
- @param createTx whether or not the passed transaction should be created on the network.
- This can be false if we want to reseed an existing transaction,
  \*/
  export function uploadTransactionAsync(tx: Transaction, blockweave: Blockweave, createTx = true) {
  return async (source: AsyncIterable<Buffer>): Promise<void> => {
  if (!tx.chunks) {
  throw Error('Transaction has no computed chunks!');
  }

      if (createTx) {
        // Ensure the transaction data field is blank.
        // We'll upload this data in chunks instead.
        tx.data = new Uint8Array(0);

        const createTxRes = await blockweave.api.post(`tx`, tx);
        if (!(createTxRes.status >= 200 && createTxRes.status < 300)) {
          throw new Error(`Failed to create transaction: ${createTxRes.data}`);
        }
      }

      const txChunkData = tx.chunks;
      const { chunks, proofs } = txChunkData;

      function prepareChunkUploadPayload(chunkIndex: number, chunkData: Buffer): ChunkUploadPayload {
        const proof = proofs[chunkIndex];

        return {
          data_root: tx.data_root,
          data_size: tx.data_size,
          data_path: bufferTob64Url(proof.proof),
          offset: proof.offset.toString(),
          chunk: bufferTob64Url(chunkData),
        };
      }

      await pipeline(
        source,
        chunker(MAX_CHUNK_SIZE, { flush: true }),
        // tslint:disable-next-line: only-arrow-functions
        async function (chunkedSource: AsyncIterable<Buffer>) {
          let chunkIndex = 0;
          let dataRebalancedIntoFinalChunk: Buffer | undefined;

          const activeChunkUploads: Promise<any>[] = [];

          for await (const chunkData of chunkedSource) {
            const currentChunk = chunks[chunkIndex];
            const chunkSize = currentChunk.maxByteRange - currentChunk.minByteRange;
            const expectedToBeFinalRebalancedChunk = dataRebalancedIntoFinalChunk != null;

            let chunkPayload: ChunkUploadPayload;

            if (chunkData.byteLength === chunkSize) {
              // If the transaction data chunks was never rebalanced this is the only code path that
              // will execute as the incoming chunked data as the will always be equivalent to `chunkSize`.
              chunkPayload = prepareChunkUploadPayload(chunkIndex, chunkData);
            } else if (chunkData.byteLength > chunkSize) {
              // If the incoming chunk data is larger than the expected size of the current chunk
              // it means that the transaction had chunks that were rebalanced to meet the minimum chunk size.
              //
              // It also means that the chunk we're currently processing should be the second to last
              // chunk.
              chunkPayload = prepareChunkUploadPayload(chunkIndex, chunkData.slice(0, chunkSize));

              dataRebalancedIntoFinalChunk = chunkData.slice(chunkSize);
            } else if (chunkData.byteLength < chunkSize && expectedToBeFinalRebalancedChunk) {
              // If this is the final rebalanced chunk, create the upload payload by concatenating the previous
              // chunk's data that was moved into this and the remaining stream data.
              chunkPayload = prepareChunkUploadPayload(
                chunkIndex,
                Buffer.concat(
                  [dataRebalancedIntoFinalChunk!, chunkData],
                  dataRebalancedIntoFinalChunk!.length + chunkData.length,
                ),
              );
            } else {
              throw Error('Transaction data stream terminated incorrectly.');
            }

            const chunkValid = await merkle.validatePath(
              txChunkData.data_root,
              parseInt(chunkPayload.offset, 10),
              0,
              parseInt(chunkPayload.data_size, 10),
              b64UrlToBuffer(chunkPayload.data_path),
            );

            if (!chunkValid) {
              throw new Error(`Unable to validate chunk ${chunkIndex}.`);
            }

            // Upload multiple transaction chunks in parallel to speed up the upload.

            // If we are already at the maximum concurrent chunk upload limit,
            // wait till all of them to complete first before continuing.
            if (activeChunkUploads.length >= MAX_CONCURRENT_CHUNK_UPLOAD_COUNT) {
              await Promise.all(activeChunkUploads);
              // Clear the active chunk uploads array.
              activeChunkUploads.length = 0;
            }

            activeChunkUploads.push(
              backOff(() => blockweave.api.post('chunk', chunkPayload), {
                retry: (err) => !FATAL_CHUNK_UPLOAD_ERRORS.includes(err.message),
              }),
            );

            chunkIndex++;
          }

          await Promise.all(activeChunkUploads);

          if (chunkIndex < chunks.length) {
            throw Error('Transaction upload incomplete.');
          }
        },
      );

  };
  }

================================================
File: src/utils/utils.ts
================================================
/\*\*

- utils.ts - Various utility functions
  \*/

import Blockweave from 'blockweave';
import fs from 'fs';
import path from 'path';
import minimist from 'minimist';
import clc from 'cli-color';
import tempDirectory from 'temp-dir';

export function setArweaveInstance(argv: minimist.ParsedArgs, debug: boolean): Blockweave {
const timeout = argv.timeout || 20000;
const gateway = argv.gateway || argv.g || 'https://arweave.net';

return new Blockweave(
{
url: gateway,
timeout,
logging: debug,
},
[gateway],
);
}

export function isValidWalletAddress(address: string): boolean {
return /[a-z0-9_-]{43}/i.test(address);
}

export function bytesForHumans(bytes: number): string {
const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'];

let output: string;

sizes.forEach((unit, id) => {
const s = Math.pow(1024, id);
let fixed = '';
if (bytes >= s) {
fixed = String((bytes / s).toFixed(2));
if (fixed.indexOf('.0') === fixed.length - 2) {
fixed = fixed.slice(0, -2);
}
output = `${fixed} ${unit}`;
}
});

if (!output) {
return `0 Bytes`;
}

return output;
}

export function numbersForHumans(x: number): string {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function dirExists(dir: string): boolean {
return fs.existsSync(dir);
}

export function getUserDirectory(): string {
return process.cwd();
}

export function getPackageVersion(): string {
return require(path.join(\_\_dirname, '..', '..', 'package.json')).version;
}

export async function pause(ms: number) {
return new Promise((resolve) => setTimeout(resolve, ms));
}

// tslint:disable-next-line: variable-name
export function snakeCaseToTitleCase(snake*case: string): string {
const sentence = snake_case.toLowerCase().split('*');
for (let i = 0; i < sentence.length; i++) {
sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
}

return sentence.join(' ');
}

/\*\*

-
- @param colors colors option (--colors) set in cli
- @param text text to parsed
- @param color color to be parsed to
- @returns parsed
  \*/
  export const parseColor = (colors: boolean, text: string | number, color?: string): string => {
  if (colors === false) {
  return text as string;
  } else {
  return clc[color](text);
  }
  };

export function getTempDir(): string {
// arkb temp dir
const dir = path.join(tempDirectory, '.arkb');

if (!fs.existsSync(dir)) {
fs.mkdirSync(dir);
}

return dir;
}

================================================
File: src/utils/wallet.ts
================================================
import fs from 'fs';
import { JWKInterface } from 'arweave/node/lib/wallet';
import cliQuestions from './cli-questions';
import Crypter from './crypter';
import Conf from 'conf';
import { parseColor } from './utils';

export async function getWallet(walletPath: string, config: Conf, debug: boolean, colors?: boolean) {
let wallet: JWKInterface;
const walletEncr: string = config.get('wallet') as string;

if (walletPath) {
if (typeof walletPath !== 'string') {
console.log(parseColor(colors, 'The wallet must be specified.', 'red'));
return;
}

    try {
      wallet = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
    } catch (e) {
      console.log(parseColor(colors, 'Invalid wallet path.', 'red'));
      if (debug) console.log(e);
      return;
    }

}

if (!wallet) {
if (walletEncr) {
const res = await cliQuestions.askWalletPassword();
const crypter = new Crypter(res.password);
try {
const decrypted = crypter.decrypt(Buffer.from(walletEncr, 'base64'));
wallet = JSON.parse(decrypted.toString());
} catch (e) {
console.log(parseColor(colors, 'Invalid password.', 'red'));
if (debug) console.log(e);
return;
}
}
}

if (!wallet) {
console.log(parseColor(colors, 'Save a wallet with `arkb wallet-save file-path.json`.', 'red'));
return;
}

return wallet;
}

================================================
File: .github/workflows/deploy.yml
================================================
name: release
on:
push:
tags: - v\*

jobs:
publish:
name: Publish
runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
      - run: npm install
      - run: npm run build
      - uses: JS-DevTools/npm-publish@v1
        with:
          token: ${{ secrets.NPM_TOKEN }}
          access: public

================================================
File: .husky/pre-commit
================================================
#!/bin/sh
. "$(dirname "$0")/\_/husky.sh"

npm run format
npm run format
npm run lint
npm run build
