//import SignupPage from'../pages/SignupPage' //cmd para somente importar sem instanciar
import signup from '../pages/SignupPage'  //desta maneira ja traz a classe instanciada
import signupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'


describe('Signup', () => {

    /* beforeEach(function() {
        cy.fixture('deliver').then((d)=> {
            this.deliver = d
        })
    }) */

    //var signup = new SignupPage()  //instancia a classe SignupPage

    // //uso de ganchos - exemplos abaixo
    // before(function() {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    // })

    // beforeEach(function() {
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
    // })

    // after(function() {
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    // })

    // afterEach(function() {
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
    // })

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        /*         var deliver = {
                    name: 'PC Carvalho',
                    cpf: '00000014141',
                    email: 'leba@aol.com',
                    whatsapp: '11999999999',
                    address: {
                        postalcode: '04534011',
                        street: 'Rua Joaquim Floriano',
                        number: '1000',
                        details: 'Ap 142',
                        district: 'Itaim Bibi',
                        city_state: 'São Paulo/SP'
                    },
                    delivery_method: 'Moto',  //aqui defino o método de entrega e o cy.contains traz ele no meu teste
                    cnh: 'cnh-digital.jpg'
                }
         */


        SignupPage.go()
        SignupPage.fillform(deliver) //a chamada (deliver) especifica a massa de teste definida
        SignupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141aa'

        /*         var deliver = {
                    name: 'PC Carvalho',
                    cpf: '0000AA14141',
                    email: 'leba@aol.com',
                    whatsapp: '11999999999',
                    address: {
                        postalcode: '04534011',
                        street: 'Rua Joaquim Floriano',
                        number: '1000',
                        details: 'Ap 142',
                        district: 'Itaim Bibi',
                        city_state: 'São Paulo/SP'
                    },
                    delivery_method: 'Moto',  //aqui defino o método de entrega e o cy.contains traz ele no meu teste
                    cnh: 'cnh-digital.jpg'
                } */

        //var signup = new SignupPage()  //melhorando o codig, inserindo em describe

        SignupPage.go()
        SignupPage.fillform(deliver) //a chamada (deliver) especifica a massa de teste definida
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {
        var deliver = signupFactory.deliver()
        deliver.email = 'user.com.br'

        SignupPage.go()
        SignupPage.fillform(deliver) //a chamada (deliver) especifica a massa de teste definida
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    /* it('Required fields', function () {
        SignupPage.go()
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('É necessário informar o nome')
        SignupPage.alertMessageShouldBe('É necessário informar o CPF')
        SignupPage.alertMessageShouldBe('É necessário informar o email')
        SignupPage.alertMessageShouldBe('É necessário informar o CEP')
        SignupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        SignupPage.alertMessageShouldBe('Selecione o método de entrega')
        SignupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    }) */

    //outra forma de fazer o teste de campos sem q aborte se por um acaso a msg foi alterada
    context('Required fields', function () {
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]
        before(function () {
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function(msg) {
            it(`${msg.field} is required`, function() {
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })



})
