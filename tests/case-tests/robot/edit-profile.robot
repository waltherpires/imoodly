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
    Realizar login    ${EMAIL}    ${PASSWORD}
    Capture Page Screenshot
    Wait Until Element Is Visible     css:[data-testid="my-dropdown-trigger"]
    Sleep    1s
    Click Element    css:[data-testid="my-dropdown-trigger"]
    Sleep    2s
    Capture Page Screenshot
    Wait Until Element Is Visible    css:[data-testid="perfil-item"]
    Click Element    css:[data-testid="perfil-item"]
    Sleep    2s
    Capture Page Screenshot
    Click Button    Editar
    Capture Page Screenshot
    Clear Element Text    name=name
    Input Text    name=name     Nome Alterado
    Capture Page Screenshot
    Click Button    Salvar
    Capture Page Screenshot
    Page Should Contain    Login
    Sleep    3s

Cenário: Edição de Usuário com dados incorretos
    [Documentation]    Testar a edição dos dados cadastrados do usuário preenchendo os campos de forma incorreta.
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    ${EDITEMAIL}=    Get Environment Variable    EDITEMAIL
    Realizar login    ${EMAIL}    ${PASSWORD}
    Capture Page Screenshot
    Wait Until Element Is Visible     css:[data-testid="my-dropdown-trigger"]
    Sleep    1s
    Click Element    css:[data-testid="my-dropdown-trigger"]
    Sleep    2s
    Capture Page Screenshot
    Wait Until Element Is Visible    css:[data-testid="perfil-item"]
    Click Element    css:[data-testid="perfil-item"]
    Sleep    2s
    Capture Page Screenshot
    Click Button    Editar
    Capture Page Screenshot
    Clear Element Text    name=email
    Input Text    name=email    ${EDITEMAIL}
    Capture Page Screenshot
    Click Button    Salvar
    Sleep    2s
    Page Should Contain    Email inválido
    Capture Page Screenshot
    