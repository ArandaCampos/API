import re
def validatorContainer(cliente, numero, tipo, status, categoria):
    tipos = [20, 40]
    status_list = ['cheio', 'vazio']
    categorias = ['importação', 'exportação']
    if (not cliente):
        return False
    if (not re.match(r'[A-Z]{4}[0-9]{7}', numero)):
        return False
    if (not (tipo in tipos)):
        return False
    if (not (status in status_list)):
        return False
    if (not (categoria in status_list)):
        return False
    return True

def validatorMovimentacao(tipo, data_inicio, data_fim):
    tipos = ['embarque', 'descarga', 'gate in', 'gate out', 'reposicionamento', 'pesagem', 'scanner']
    if (not (tipo in tipos)):
        return False
    if (not re.match(r'[0-9]{4}[-][0-9]{2}[-][0-9]{2}[T][0-9]{2}:[0-9]{2}', data_inicio)):
        return False
    if (not re.match(r'[0-9]{4}[-][0-9]{2}[-][0-9]{2}[T][0-9]{2}:[0-9]{2}', data_fim)):
        return False
    return True
