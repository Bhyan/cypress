import signupPage from '../support/pages/signup/index'

describe('Cadastro', function () {

    before(function () {
        cy.fixture('signup').then(function (signup) {
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('Quando o usuário é novato', function () {
        before(function () {
            cy.task('removeUser', this.success.email)
                .then((result) => {
                    cy.log(result)
                })
        })

        it('deve cadastrar um novo usuário', function () {
            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o e-mail já existe', function () {
        before(function () {
            cy.postUser(this.email_dup)
        })

        it('não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é incorreto', function () {
        it('Deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('Quando a senha é muito curta', function () {
        const passwords = ['p', 'pw', 'pwd', 'pwd1', 'pwd12']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('Não deve cadastrar com a senha: ' + p, function () {
                this.short_password.password = p

                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })
    })

    context('Quando não preencho nenhum dos campos', () => {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach((alert) => {
            it('Deve exibir: ' + alert, () => {
                signupPage.alert.haveText(alert)
            })
        })
    })
})