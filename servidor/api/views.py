from django.http import JsonResponse, HttpResponseBadRequest
from api.models import Container, Movimentacao
from api.validator import validatorContainer, validatorMovimentacao
import json

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
        parse_data = json.load(request)
        cliente = parse_data['cliente']
        num = parse_data['numero']
        tipo = int(parse_data['tipo'])
        sta = parse_data['status']
        cat = parse_data['categoria']
        mov = int(parse_data['movimentacao'])
        if (not validatorContainer(cliente, num, tipo, sta, cat)):
            # return JsonResponse([{'msg': 'Valores do formulário incorretos'}], safe=False)
            return HttpResponseBadRequest('Valores do formulário incorretos', status=400)
        try:
            movimentacao = Movimentacao.objects.get(id__iexact=mov)
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
            dados = [{'msg': 'Falha na conexão com o banco de dados'}]
        return JsonResponse(dados, safe=False)
    elif request.method == 'DELETE':
        try:
            container = Container.objects.get(id=id)
            container.delete()
            dados = [{'msg': 'Excluído com sucesso!'}]
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
        return JsonResponse(dados, safe=False)
    if request.method == 'PUT':
        try:
            update = Container.objects.get(id__exact=id)
        except:
            return HttpResponseBadRequest('Valores do formulário incorretos', status=400)
        parse_data = json.load(request)
        update['cliente'] = parse_data['cliente']
        update['numero'] = parse_data['numero']
        update['tipo'] = int(parse_data['tipo'])
        update['status'] = parse_data['status']
        update['categoria'] = parse_data['categoria']
        mov = int(parse_data['movimentacao'])
        update['movimentacao'] = Movimentacao.objects.get(id__iexact=mov)
        if (not validatorContainer(update['cliente'], update['numero'], update['tipo'], update['status'], update['categoria'])):
            return HttpResponseBadRequest('Valores do formulário incorretos', status=400)
        try:
            update.save()
            return JsonResponse([{'msg': 'Criado com sucesso'}], safe=False)
        except:
            return JsonResponse([{'msg': 'Erro na criação'}], safe=False)


def MovimentacaoView(request):
    if request.method == 'GET':
        try:
            dados = list(Movimentacao.objects.all().values())
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
        return JsonResponse(dados, safe=False)
    elif request.method == 'POST':
        parse_data = json.load(request)
        tipo = parse_data['tipo']
        data_inicio = parse_data['data_inicio']
        data_fim = parse_data['data_fim']
        if (not validatorMovimentacao(tipo, data_inicio, data_fim)):
            return JsonResponse([{'msg': 'Valores do formulário incorretos'}], safe=False)
        try:
            novo = Movimentacao.objects.create(tipo=tipo, data_inicio=data_inicio, data_fim=data_fim)
            novo.save()
            print("Criado com sucesso")
            return JsonResponse([{'msg': 'Criado com sucesso'}], safe=False)
        except:
            print("Falha na criação")
            return JsonResponse([{'msg': 'Erro na criação'}], safe=False)


def MovimentacaoIdView(request, id):
    if request.method == 'GET':
        try:
            dados = list(Movimentacao.objects.filter(id=id).values())
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
        return JsonResponse(dados, safe=False)
    elif request.method == 'DELETE':
        try:
            movimentacao = Movimentacao.objects.get(id=id)
            movimentacao.delete()
            dados = [{'msg': 'Movimentação excluída com sucesso!'}]
        except:
            dados = [ {
                'msg': 'Falha na conexão com o banco de dados'
            }]
        return JsonResponse(dados, safe=False)
    elif request.method == 'PUT':
        try:
            movimentacao = Movimentacao.objects.get(id=id)
        except:
            print('Não localizou a movimentação')
        try:
            print('Localizou a movimentação')
            parse_data = json.load(request)
            movimentacao.tipo = parse_data['tipo']
            movimentacao.data_inicio = parse_data['data_inicio']
            movimentacao.data_fim = parse_data['data_fim']
            print(movimentacao.tipo)
            if (not validatorMovimentacao(movimentacao['tipo'], movimentacao['data_inicio'], movimentacao['data_fim'])):
                print('não é válido')
                return JsonResponse([{'msg': 'Valores do formulário incorretos'}], safe=False)
            print('Antes de criar')
            movimentacao.save()
            print('criou')
            dados = [{'msg': 'Movimentação excluída com sucesso!'}]
        except:
            print('falhou')
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
