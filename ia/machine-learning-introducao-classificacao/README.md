# Curso de Introdução ao Machine Learning

Utilizado algoritmo Multinomial Naive Bayes e AdaBoost.


### Classificação de Animais
* Características: [ É gordinho?, Tem perna curta?, Faz auau? ]
* Código: classifica_animais.py

### Classificação se irá comprar
* Características: [ Acessou home?, Acessou como funciona?, Acessou contato? ]
* Código: classifica_compras.py

### Classifica buscas que irão comprar
* Características: [ Acessou home?, Busca feita, Estava logado? ]
* Base de comparação: algoritmo burro que sempre retorna Sim (1)
* Código: classifica_buscas.py
* Notas:
  * Utiliza o lib pandas para carregar o arquivo e tratar os dados categóricos (busca feita)

### Classifica buscas que irão comprar com dois algoritmos
* É feito a comparação de dois algoritmos: Neive Bayes e Adapting Boosting


## Libs
* sklearn: kit com algoritmos de machine learning
* [pandas](http://pandas.pydata.org/): data science