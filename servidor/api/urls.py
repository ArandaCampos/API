from django.urls import path
from api.views import ContainerView, MovimentacaoView, RelatorioClienteView, RelatorioCountView, MovimentacaoIdView, ContainerIdView

urlpatterns = [ 
    path('container/', ContainerView),
    path('container/<int:id>', ContainerIdView),

    path('movimentacao/', MovimentacaoView),
    path('movimentacao/<int:id>', MovimentacaoIdView),
    
    path('relatorio/cliente', RelatorioClienteView),
    path('relatorio/count', RelatorioCountView),
]