from django.db import models

class Movimentacao(models.Model):
    TIPOS = [ 
        ('embarque', 'embarque'),
        ('descarga', 'descarga'),
        ('gate in', 'gate in'),
        ('gate out', 'gate out'),
        ('reposicionamento','reposicionamento'),
        ('pesagem', 'pesagem'),
        ('scanner', 'scanner')
    ]
    tipo = models.CharField(max_length=16, choices=TIPOS,blank=False, null=False)
    data_inicio = models.DateTimeField(auto_created=False, auto_now_add=False)
    data_fim = models.DateTimeField(auto_created=False, auto_now_add=False)

class Container(models.Model):
    TIPOS = [ 
        (20, 20),
        (40, 40) 
    ]
    STATUS = [ 
        ('cheio', 'cheio'),
        ('vazio', 'vazio')
    ]
    CATEGORIAS = [ 
        ('importação', 'importação'),
        ('exportação', 'exportação')
    ]
    cliente = models.CharField(max_length=255, blank=False, null=False)
    numero = models.CharField(max_length=11, blank=False, null=False)
    tipo = models.IntegerField(choices=TIPOS, blank=False, null=False)
    status =  models.CharField(max_length=5,choices=STATUS, blank=False, null=False)
    categoria = models.CharField(max_length=10, choices=CATEGORIAS,blank=False, null=False)
    movimentacao = models.ForeignKey(Movimentacao, related_name='container', on_delete=models.CASCADE)
