import login from '../support/pages/login'
import dash from '../support/pages/dash'


describe('login', () => {
    context('quando o usuário é muito bom', () => {

        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        })

        it('deve logar com sucesso', () => {
            login.go()
            login.form(user)
            login.submit()

            dash.header.userLoggerIn(user.name)
        })
    })

    context('quando o usuário é bom mas a senha está incorreta', () => {
        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user).then(() => {
                user.password = 'abc123'
            })
        })

        it('deve notificar erro de credenciais', () => {
            login.go()
            login.form(user)
            login.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            login.toast.shouldHaveText(message)
        })
    })

    context('quando o formato do email é inválido', () => {
        const emails = [
            'papito.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            'papito@',
            '111',
            '&*^&^&*',
            'xpto123'
        ]

        before(() => {
            login.go()
        })

        emails.forEach((email) => {
            it('não deve logar com o email: ' + email, () => {
                const user = { email: email, password: 'pwd123' }

                login.form(user)
                login.submit()
                login.alert.haveText('Informe um email válido')
            })
        })
    })

    context('Quando não preencho nenhum dos campos', () => {
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            login.go()
            login.submit()
        })

        alertMessages.forEach((alert) => {
            it('Deve exibir: ' + alert, () => {
                login.alert.haveText(alert)
            })
        })
    })
})