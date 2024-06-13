<?php
include('conexao.php');
include('protect.php');

if (isset($_GET['id'])) {
    $id_exercicio = $_GET['id'];

    $mysqli->begin_transaction();

    try {
        // Excluir os registros na tabela exercicioslistados que referenciam o exercício
        $sql_exercicioslistados = "DELETE FROM exercicioslistados WHERE id_exercicio = ?";
        $stmt_exercicioslistados = $mysqli->prepare($sql_exercicioslistados);
        $stmt_exercicioslistados->bind_param("i", $id_exercicio);
        $stmt_exercicioslistados->execute();

        if ($stmt_exercicioslistados->error) {
            throw new Exception("Erro ao deletar registros na tabela exercicioslistados: " . $stmt_exercicioslistados->error);
        }
        
        $sql_listaexercicio = "DELETE FROM listaexercicio WHERE id_exercicio = ?";
        $stmt_listaexercicio = $mysqli->prepare($sql_listaexercicio);
        $stmt_listaexercicio->bind_param("i", $id_exercicio);
        $stmt_listaexercicio->execute();

        if ($stmt_listaexercicio->error) {
            throw new Exception("Erro ao deletar registros na tabela listaexercicio: " . $stmt_listaexercicio->error);
        }

        // Executar a consulta de exclusão na tabela exercicios
        $sql_exercicios = "DELETE FROM exercicios WHERE id_exercicio = ?";
        $stmt_exercicios = $mysqli->prepare($sql_exercicios);
        $stmt_exercicios->bind_param("i", $id_exercicio);
        $stmt_exercicios->execute();

        if ($stmt_exercicios->error) {
            throw new Exception("Erro ao deletar exercício: " . $stmt_exercicios->error);
        }

        if ($stmt_exercicios->affected_rows > 0) {
            echo "Exercício deletado com sucesso!";
        } else {
            echo "Erro ao deletar exercício.";
        }

        $mysqli->commit();

        $stmt_exercicioslistados->close();
        $stmt_listaexercicio->close();
        $stmt_exercicios->close();
        $mysqli->close();

        header("Location: EXERCICIOS.php");
        exit;
    } catch (Exception $e) {
        $mysqli->rollback();
        echo "Erro ao deletar exercício: " . $e->getMessage();
    }
} else {
    echo "ID do exercício não fornecido.";
}
?>
