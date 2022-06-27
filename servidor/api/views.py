from unicodedata import category
from django.http import JsonResponse
from api.models import Container, Movimentacao

def ContainerView(request):
    if request.method == 'GET':
        try:
            dados = list(Container.objects.all().values())
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
        return JsonResponse(dados, safe=False)
    if request.method == 'POST':
        cliente = request.POST['cliente']
        num = request.POST['numero']
        tipo = request.POST['tipo']
        sta = request.POST['status']
        cat = request.POST['categoria']
        mov = request.POST['movimentacao']
        movimentacao = Movimentacao.objects.get(id__iexact=mov)
        try:
            novo = Container.objects.create(cliente=cliente, numero=num, tipo=tipo, status=sta, categoria=cat, movimentacao=movimentacao)
            novo.save()
            return JsonResponse([{'msg': 'Criado com sucesso'}], safe=False)
        except:
            return JsonResponse([{'msg': 'Erro na criação'}], safe=False)
            

def ContainerIdView(request, id):
    if request.method == 'GET':
        try:
            dados = list(Container.objects.filter(id=id).values())
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
    return JsonResponse(dados, safe=False)


def MovimentacaoView(request):
    if request.method == 'GET':
        try:
            dados = list(Movimentacao.objects.all().values())
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
        return JsonResponse(dados, safe=False)

def MovimentacaoIdView(request, id):
    if request.method == 'GET':
        try:
            dados = list(Movimentacao.objects.filter(id=id).values())
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
    return JsonResponse(dados, safe=False)


def RelatorioClienteView(request):
    if request.method == 'GET':
        try:
            em = list(Container.objects.filter(movimentacao__tipo__iexact='embarque').values('cliente'))
            de = list(Container.objects.filter(movimentacao__tipo__iexact='descarga').values('cliente'))
            gi = list(Container.objects.filter(movimentacao__tipo__iexact='gate in').values('cliente'))
            go = list(Container.objects.filter(movimentacao__tipo__iexact='gate out').values('cliente'))
            re = list(Container.objects.filter(movimentacao__tipo__iexact='reposicionamento').values('cliente'))
            pe = list(Container.objects.filter(movimentacao__tipo__iexact='pesagem').values('cliente'))
            sc = list(Container.objects.filter(movimentacao__tipo__iexact='scanner').values('cliente'))
            dados = [ 
                {
                    'tipo': 'Embarque',
                    'clientes': em
                },
                {
                    'tipo': 'Descagar',
                    'clientes': de
                },
                {
                    'tipo': 'Gate in',
                    'clientes': gi
                },
                {
                    'tipo': 'Gate out',
                    'clientes': go
                },
                {
                    'tipo': 'Reposicionamento',
                    'clientes': re
                },
                {
                    'tipo': 'Pesagem',
                    'clientes': pe
                },
                {
                    'tipo': 'Scanner',
                    'clientes': sc
                },
            ]
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
        return JsonResponse(dados, safe=False)

def RelatorioCountView(request):
    if request.method == 'GET':
        try:
            ex = Container.objects.filter(categoria__iexact='exportação').count()
            im = Container.objects.filter(categoria__iexact='importação').count()
            dados = [ 
                {
                    'tipo': 'Exportação',
                    'quantia': ex
                },
                {
                    'tipo': 'Importação',
                    'quantia': im
                }
            ]
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
        return JsonResponse(dados, safe=False)