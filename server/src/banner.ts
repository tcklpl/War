import { c } from 'tasai';

export class WarServerBanner {
	readonly version = process.env.SERVER_VERSION;
	readonly sourceUrl = 'https://github.com/tcklpl/war';
	private readonly _sourceMsg = `Source available at ${c.underline(this.sourceUrl)}`;
	readonly greetings = `
        War2 Server ${c.dim(this.version ?? 'In-Development')} ${c.dim('@ Bun')} ${c.dim(Bun.version)}
        ${c.dim(this._sourceMsg)}
        Enter help to see the command list.
    `;
}
