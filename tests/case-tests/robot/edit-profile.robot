*** Settings ***
Library    SeleniumLibrary    screenshot_root_directory=results/screenshots/edit-profile
Library    OperatingSystem
Resource    keywords.robot

*** Variables ***
${EMAIL}    ${EMPTY}
${PASSWORD}    ${EMPTY}
${NAME}    ${EMPTY}
${EDITEMAIL}    ${EMPTY}

*** Test Cases ***
Cenário: Edição de Usuário com dados corretos
    [Documentation]    Acessar tela de Edição de Perfil, Preencher o formulário com dados corretos e testar a funcionalidade de edição de perfil
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    ${NAME}=    Get Environment Variable    NAME
    Open Browser    http://localhost:3000    edge    
    Realizar login    ${EMAIL}    ${PASSWORD}
    Wait Until Element Is Visible     css:[data-testid="my-dropdown-trigger"]
    Sleep    4s
    Capture Page Screenshot
    Click Element    css:[data-testid="my-dropdown-trigger"]
    Sleep    3s
    Capture Page Screenshot
    Wait Until Element Is Visible    css:[data-testid="perfil-item"]
    Click Element    css:[data-testid="perfil-item"]
    Sleep    3s
    Capture Page Screenshot
    Click Button    Editar
    Sleep    3s
    Capture Page Screenshot
    Clear Element Text    name=name
    Input Text    name=name     Nome Alterado
    Capture Page Screenshot
    Sleep    2s
    Click Button    Salvar
    Sleep    2s
    Capture Page Screenshot
    Page Should Contain    Login
    Sleep    3s

Cenário: Edição de Usuário com dados incorretos
    [Documentation]    Testar a edição dos dados cadastrados do usuário preenchendo os campos de forma incorreta.
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    ${EDITEMAIL}=    Get Environment Variable    EDITEMAIL
    Open Browser    http://localhost:3000    edge    
    Realizar login    ${EMAIL}    ${PASSWORD}
    Wait Until Element Is Visible     css:[data-testid="my-dropdown-trigger"]
    Sleep    4s
    Capture Page Screenshot
    Click Element    css:[data-testid="my-dropdown-trigger"]
    Sleep    3s
    Capture Page Screenshot
    Wait Until Element Is Visible    css:[data-testid="perfil-item"]
    Click Element    css:[data-testid="perfil-item"]
    Sleep    3s
    Capture Page Screenshot
    Click Button    Editar
    Capture Page Screenshot
    Clear Element Text    name=email
    Input Text    name=email    ${EDITEMAIL}
    Capture Page Screenshot
    Click Button    Salvar
    Sleep    3s
    Capture Page Screenshot
    Page Should Contain    Email inválido
    