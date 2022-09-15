import { useState } from 'react'
import { Appbar, DataTable, Button, TextInput, Paragraph, Dialog, Portal } from 'react-native-paper'

export default function Home() {

    const [display, setDisplay] = useState({})
    const [cep, setCEP] = useState('')
    const [visible, setVisible] = useState(false)

    const hideDialog = () => setVisible(false)

    async function apiSearch() {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setDisplay(data)
                } else {
                    setVisible(true)
                }

            })
            .catch((error) => {
                setVisible(true)
                setCEP('')
            })
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Buscador de CEP" />
            </Appbar.Header>
            <TextInput
                label="CEP"
                value={cep}
                onChangeText={cep => {
                    setCEP(cep.replace(/[^0-9]/g, ''))
                }
                }
            />
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>CEP:</DataTable.Cell>
                    <DataTable.Cell>{display.cep}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Logradouro:</DataTable.Cell>
                    <DataTable.Cell>{display.logradouro}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Complemento:</DataTable.Cell>
                    <DataTable.Cell>{display.complemento}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Bairro:</DataTable.Cell>
                    <DataTable.Cell>{display.bairro}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Localidade:</DataTable.Cell>
                    <DataTable.Cell>{display.localidade}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>UF:</DataTable.Cell>
                    <DataTable.Cell>{display.uf}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>IBGE:</DataTable.Cell>
                    <DataTable.Cell>{display.ibge}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>GIA:</DataTable.Cell>
                    <DataTable.Cell>{display.gia}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>DDD:</DataTable.Cell>
                    <DataTable.Cell>{display.ddd}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Siafi:</DataTable.Cell>
                    <DataTable.Cell>{display.siafi}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Button
                            icon="cancel"
                            mode="outlined"
                            onPress={() => {
                                setDisplay({})
                                setCEP('')
                            }}
                        >
                            Limpar
                        </Button>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Button
                            icon="magnify"
                            mode="contained"
                            onPress={async () => await apiSearch()}
                        >
                            Buscar
                        </Button>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>CEP Inválido</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Não foram encontradas informações para o CEP informado</Paragraph>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </>
    )
}