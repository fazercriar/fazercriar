/* ==========================================================================
   FazerCriar — CONFIGURAÇÃO DO SITE
   --------------------------------------------------------------------------
   Este é o único arquivo que você precisa editar para:
   - número do WhatsApp e mensagens de cada botão;
   - Instagram e e-mail;
   - logo oficial;
   - galeria de projetos.
   ========================================================================== */

window.FAZERCRIAR_CONFIG = {
  /* ------------------------------------------------------------------------
     WHATSAPP
     Apenas números, com código do país (55) + DDD + número.
     Exemplo de formato: "5511912345678"
     Enquanto estiver "WHATSAPP_NUMBER", os botões abrem o WhatsApp sem
     destinatário (o visitante escolhe o contato) e um aviso aparece
     somente quando o site é aberto localmente.
     ------------------------------------------------------------------------ */
  whatsappNumber: "WHATSAPP_NUMBER",

  /* Mensagem pré-preenchida de cada botão (atributo data-wa no HTML). */
  whatsappMessages: {
    orcamento: "Olá! Conheci a FazerCriar pelo site e gostaria de solicitar um orçamento.",
    impressao3d: "Olá! Conheci a FazerCriar pelo site e gostaria de solicitar um orçamento de impressão 3D.",
    laser: "Olá! Gostaria de solicitar um orçamento de corte e gravação a laser.",
    prototipagem: "Olá! Tenho uma ideia e gostaria de conversar sobre prototipagem.",
    personalizados: "Olá! Gostaria de personalizar um produto com a FazerCriar.",
    empresas: "Olá! Gostaria de uma proposta para produtos personalizados para minha empresa.",
    contato: "Olá! Vim pelo site da FazerCriar e gostaria de conversar sobre um projeto."
  },

  /* ------------------------------------------------------------------------
     REDES E E-MAIL
     Deixe vazio ("") para ocultar o item no rodapé.
     instagram: apenas o nome de usuário, sem @ (ex.: "fazercriar")
     ------------------------------------------------------------------------ */
  instagram: "",
  email: "",

  /* ------------------------------------------------------------------------
     LOGO
     Coloque o arquivo oficial em assets/logo/ e informe o caminho abaixo.
     Use a versão para FUNDO ESCURO (texto claro). SVG é o formato ideal.
     Vazio ("") = usa o logotipo provisório em texto.
     ------------------------------------------------------------------------ */
  logo: {
    src: "",            // ex.: "assets/logo/fazercriar-logo-negativa.svg"
    alt: "FazerCriar",
    width: 168,         // largura de exibição no cabeçalho (px)
    height: 36          // altura de exibição no cabeçalho (px)
  },

  /* ------------------------------------------------------------------------
     PROJETOS (galeria)
     Para adicionar uma foto real: coloque o arquivo em assets/images/projetos/
     e preencha "imagem" com o caminho. Sem imagem = card provisório.
     Recomendado: .webp ou .jpg, 1200 × 900 px, até ~250 KB.
     Para remover um item, apague o bloco { ... } correspondente.
     "icone": impressao3d | laser | prototipagem | personalizados | empresas
     ------------------------------------------------------------------------ */
  projetos: [
    {
      titulo: "Peças funcionais",
      categoria: "Impressão 3D",
      descricao: "Suportes, encaixes e componentes sob medida.",
      imagem: "",
      alt: "",
      icone: "impressao3d"
    },
    {
      titulo: "Protótipos de produto",
      categoria: "Prototipagem",
      descricao: "Modelos físicos para testar forma, ergonomia e encaixe.",
      imagem: "",
      alt: "",
      icone: "prototipagem"
    },
    {
      titulo: "Placas e sinalização",
      categoria: "Corte e gravação a laser",
      descricao: "Placas em MDF e peças gravadas com acabamento preciso.",
      imagem: "",
      alt: "",
      icone: "laser"
    },
    {
      titulo: "Brindes corporativos",
      categoria: "Para empresas",
      descricao: "Objetos personalizados com a identidade da sua marca.",
      imagem: "",
      alt: "",
      icone: "empresas"
    },
    {
      titulo: "Presentes personalizados",
      categoria: "Produtos personalizados",
      descricao: "Peças exclusivas para datas e pessoas especiais.",
      imagem: "",
      alt: "",
      icone: "personalizados"
    },
    {
      titulo: "Elementos decorativos",
      categoria: "Corte a laser + 3D",
      descricao: "Luminárias, painéis e objetos de decoração sob demanda.",
      imagem: "",
      alt: "",
      icone: "laser"
    }
  ]
};
