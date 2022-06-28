import re
def validatorContainer(cliente, numero, tipo, status, categoria):
    if (not cliente):
        return False
    if (not re.match(r'[A-Z]{4}[0-9]{7}', numero)):
        return False
    if (not (tipo == 40 or tipo == 20)):
        return False
    if (not (status == 'cheio' or status == 'vazio')):
        return False
    if (not (categoria == 'importação' or categoria == 'exportação')):
        return False
    return True

def validatorMovimentacao(tipo, data_inicio, data_fim):
    if (not (tipo == 'embarque' or tipo == 'descarga' or tipo == 'gate in' or tipo == 'gate out' or tipo == 'reposicionamento' or tipo == 'pesagem' or tipo == 'scanner')):
        return False
    if (not (re.match(r'[0-9]{4}[-][0-9]{2}[-][0-9]{2}[T][0-9]{2}:[0-9]{2}:[0-9]{2}'), data_inicio)):
        return False
    if (not (re.match(r'[0-9]{4}[-][0-9]{2}[-][0-9]{2}[T][0-9]{2}:[0-9]{2}:[0-9]{2}'), data_fim)):
        return False

    return True