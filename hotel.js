const hotelName = "Hotel Bela Vista";

const quartos = new Array(20).fill(0);

function login() {
    console.log(`Bem-vindo ao ${hotelName}!`);
    const usuario = prompt("Por favor, insira seu nome de usuário: ");
    const senha = prompt("Insira a senha: ");

    if (senha !== "2678") {
        console.log("Senha incorreta. Tente novamente.");
        return login();
    }

    console.log(`Bem-vindo ao ${hotelName}, ${usuario}. É um imenso prazer ter você por aqui!`);
    return usuario;
}

function menu(usuario) {
    while (true) {
        console.log("\nMenu:");
        console.log("1. Gerenciar Reservas");
        console.log("2. Cadastro de Hóspedes");
        console.log("3. Gerenciar Eventos");
        console.log("4. Sair");

        const opcao = parseInt(prompt("Escolha uma opção: "));

        if (opcao === 1) {
            gerenciarReservas(usuario);
        } else if (opcao === 2) {
            cadastrarHospedes(usuario);
        } else if (opcao === 3) {
            gerenciarEventos(usuario);
        } else if (opcao === 4) {
            console.log(`Muito obrigado e até logo, ${usuario}.`);
            break;
        } else {
            console.log("Opção inválida. Tente novamente.");
        }
    }
}

function gerenciarReservas(usuario) {
    console.log(`\nGerenciamento de Reservas - ${hotelName}`);

    while (true) {
        const diaria = parseFloat(prompt("Qual o valor padrão da diária? "));
        if (diaria < 0) {
            console.log(`Valor inválido, ${usuario}.`);
            continue;
        }

        const dias = parseInt(prompt("Quantos dias serão necessários? "));
        if (dias < 1 || dias > 30) {
            console.log(`Valor inválido, ${usuario}.`);
            continue;
        }

        const valorTotal = diaria * dias;
        console.log(`O valor de ${dias} dias de hospedagem é de R$${valorTotal.toFixed(2)}`);

        const nomeHospede = prompt("Qual o nome do hóspede? ");
        while (true) {
            const quarto = parseInt(prompt("Qual o quarto para reserva? (1 - 20): "));
            if (quartos[quarto - 1] === 0) {
                console.log(`Quarto ${quarto} está livre.`);
                const confirmacao = prompt(`${usuario}, você confirma a hospedagem para ${nomeHospede} por ${dias} dias no quarto ${quarto} por R$${valorTotal.toFixed(2)}? (S/N): `);
                if (confirmacao.toLowerCase() === 's') {
                    quartos[quarto - 1] = 1;
                    console.log(`${usuario}, reserva efetuada para ${nomeHospede} no quarto ${quarto}.`);
                }
                break;
            } else {
                console.log(`Quarto ${quarto} já está ocupado. Por favor, escolha outro quarto.`);
            }
        }
        break;
    }
    menu(usuario);
}

function cadastrarHospedes(usuario) {
    console.log(`\nCadastro de Hóspedes - ${hotelName}`);

    const diaria = parseFloat(prompt("Qual o valor padrão da diária? "));
    let totalHospedes = 0;
    let gratuidade = 0;
    let meiaDiaria = 0;
    let valorTotal = 0;

    while (true) {
        const nome = prompt("Qual o nome do hóspede? (ou digite 'PARE' para encerrar): ");
        if (nome.toUpperCase() === 'PARE') {
            break;
        }

        const idade = parseInt(prompt(`Qual a idade de ${nome}? `));

        if (idade < 6) {
            console.log(`${nome} possui gratuidade.`);
            gratuidade++;
        } else if (idade > 60) {
            console.log(`${nome} paga meia.`);
            meiaDiaria++;
            valorTotal += diaria / 2;
        } else {
            valorTotal += diaria;
        }

        totalHospedes++;
    }

    console.log(`\n${usuario}, o valor total das hospedagens é: R$${valorTotal.toFixed(2)}; ${gratuidade} gratuidade(s); ${meiaDiaria} meia(s).`);
    menu(usuario);
}

function gerenciarEventos(usuario) {
    console.log(`\nGerenciamento de Eventos - ${hotelName}`);

    // Parte 1: Verificação do auditório
    const convidados = parseInt(prompt("Qual o número de convidados para o seu evento? "));
    if (convidados > 350 || convidados < 0) {
        console.log("Número de convidados inválido.");
        return gerenciarEventos(usuario);
    }

    if (convidados <= 150) {
        const adicionais = Math.max(0, convidados - 150);
        console.log(`Use o auditório Laranja (inclua mais ${adicionais} cadeiras).`);
    } else {
        console.log("Use o auditório Colorado.");
    }

    const diaSemana = prompt("Qual o dia do evento? ").toLowerCase();
    const horaEvento = parseInt(prompt("Qual é a hora do evento? "));

    if ((diaSemana === 'sabado' || diaSemana === 'domingo') && (horaEvento < 7 || horaEvento > 15) ||
        (diaSemana !== 'sabado' && diaSemana !== 'domingo') && (horaEvento < 7 || horaEvento > 23)) {
        console.log("Auditório indisponível.");
    } else {
        const nomeEmpresa = prompt("Qual o nome da empresa? ");
        console.log(`Auditório reservado para ${nomeEmpresa}: ${diaSemana} às ${horaEvento}hs.`);
    }

    menu(usuario);
}

const usuarioLogado = login();
menu(usuarioLogado);
