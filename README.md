## API CONTAINER
![Badge de licença](http://img.shields.io/static/v1?label=LICENÇA&message=GNU&color=sucess&style=for-the-badge)   ![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=yellowgreen&style=for-the-badge)   ![Badge versionamento](http://img.shields.io/static/v1?label=VERSAO&message=1.0&color=sucess&style=for-the-badge)

### Sobre
A aplicação consiste em um CRUD de containeres e movimentações e um relatório final. (Mais informações no `requisitos.txt`)

### Bora ver como está ficando?

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/87876734/176083579-a934c4fc-356b-4824-af56-8fe3b0b2bafb.gif)

### Instalação

    # Clone o repositório
    >> git clone https://github.com/ArandaCampos/API.git

    # Crie um ambiente virtual na pasta servidor/
    >> cd servidor
    >> virtualenv .
    >> source bin/activate

    # Instale as dependências
    (servidor) >> pip install -r requirements.txt
    
    # Habilite o servidor
    (servidor) >> python manage.py runserver
    
    # Entra uma nova aba (Ctrl + Shit + T)
    # Entre no diretório cliente
    >> cd ../cliente
    
    # Instale as dependências
    >> npx create-react-app .
    >> npm install react-router-dom
    >> npm install axios
    >> npm install react-axios
    
    # Inicie o front-end
    >> npm start
    
    # Abra o navegador de sua preferência e digite localhost:3000/

E está pronto para usá-lo 💻

### Tecnologias utilizadas
- React
- Django
