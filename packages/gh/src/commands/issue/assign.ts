import Command from '../../base'
import { afterHooks, beforeHooks } from '../../hooks'
import * as logger from '../../logger'
import { getUserRepo } from '../../utils'
import { editIssue, getIssue } from './index'

export default class Assign extends Command {
    static aliases = ['i:a', 'issue:a', 'issue:assign']

    public static description = 'Assign issue to user'

    public static args = [
        {
            name: 'number',
            required: true,
            description: 'Number(s) of the issue.',
            parse: input => input.split(','),
        },
        {
            name: 'assignee',
            required: true,
            description: 'User to assign the issue to.',
        },
    ]

    public static flags = {
        ...Command.flags,
    }

    public async run() {
        const { args } = this.parse(Assign)

        runAssignCmd({ ...this.flags, ...args }).catch(err =>
            logger.error(err, 'Error assigning issue')
        )
    }
}

export async function runAssignCmd(flags) {
    await beforeHooks('issue.assign', flags)

    logger.log(
        `Assigning issue ${flags.number} on ${getUserRepo(flags)} to ${logger.colors.magenta(
            flags.assignee
        )}`
    )

    const issue = await getIssue(flags.number, flags)

    const { data } = await editIssue(flags.number, issue.title, 'open', flags)

    logger.log(logger.colors.cyan(data.html_url))

    await afterHooks('issue.assign', flags)
}
