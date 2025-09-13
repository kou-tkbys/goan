<p align="center">
  <img src="./frontend/src/assets/images/trademark-white.png" width="200">
  <img src="./frontend/src/assets/images/trademark-black.png" width="200">
</p>

## go庵
ここは…、静かな庵（いおり）にて、Go言語の無限の可能性を探る。個人用Goモジュール実験母艦「Goan」。

## 環境構築メモ

### Wails on Parrot OS (Debian系) での依存関係エラー

`wails dev` を実行した際に `gtk+-3.0` や `webkit2gtk-4.0` が見つからないというエラーが発生し、`apt` でインストールしようとすると依存関係のコンフリクトが発生する場合がある。

これは、Parrot OSの `backports` リポジトリと安定版（stable）リポジトリのパッケージバージョンが競合することが原因である。

以下の手順で `apt` の優先順位を設定することで解決できる。

#### 解決策: `apt` の優先度設定

1.  `/etc/apt/preferences.d/99-force-stable` というファイルを作成する。
    ```bash
    sudo nano /etc/apt/preferences.d/99-force-stable
    ```
2.  ファイルに以下の内容を書き込んで、安定版（stable）リポジトリを優先するように設定する。
    ```
    Package: *
    Pin: release a=stable
    Pin-Priority: 700

    Package: *
    Pin: release n=lory-backports
    Pin-Priority: 600

    Package: *
    Pin: release n=bookworm-backports
    Pin-Priority: 600
    ```
3.  パッケージリストを更新して、Wailsの依存関係をインストールする。
    ```bash
    sudo apt-get update
    sudo apt-get install libwebkit2gtk-4.0-dev libgtk-3-dev
    ```

これで、無事に `wails dev` が起動する！

#### この設定による影響

この設定は、普段は安定版のパッケージを優先して使うようにするもので、システム全体を安定させるための方法なので、よほど特別な目的がない限り問題は起きない。

ただし、もし**意図的に新しいバージョンのパッケージを `backports` からインストールしたい場合**は、`install` コマンドに `-t bookworm-backports` のように、どのリポジトリから持ってくるかを指定する必要がある。

#### 元に戻したい場合

もしこの設定を元に戻す場合、以下のコマンドを用いて作成した設定ファイルを消し、パッケージ情報を更新すること。

```bash
sudo rm /etc/apt/preferences.d/99-force-stable
sudo apt-get update
```