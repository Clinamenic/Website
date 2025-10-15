================================================
FILE: README.md
================================================

# bsky

bluesky CLI client written in Go

## Usage

```
NAME:
   bsky - bsky

USAGE:
   bsky [global options] command [command options]

VERSION:
   0.0.67

DESCRIPTION:
   A cli application for bluesky

COMMANDS:
   show-profile         Show profile
   update-profile       Update profile
   show-session         Show session
   timeline, tl         Show timeline
   stream               Show timeline as stream
   thread               Show thread
   post                 Post new text
   vote                 Vote the post
   votes                Show votes of the post
   repost               Repost the post
   reposts              Show reposts of the post
   follow               Follow the handle
   unfollow             Unfollow the handle
   follows              Show follows
   followers            Show followers
   block                Block the handle
   unblock              Unblock the handle
   blocks               Show blocks
   delete               Delete the note
   search               Search Bluesky
   login                Login the social
   notification, notif  Show notifications
   invite-codes         Show invite codes
   list-app-passwords   Show App-passwords
   add-app-password     Add App-password
   revoke-app-password  Revoke App-password
   help, h              Shows a list of commands or help for one command

GLOBAL OPTIONS:
   -a value       profile name
   -V             verbose (default: false)
   --help, -h     show help
   --version, -v  print the version
```

```
$ bsky login [handle] [password]
$ bsky timeline
```

```
$ bsky post -image ~/pizza.jpg 'I love 🍕'
```

```
$ bsky vote at://did:plc:xxxxxxxxxxxxxxxxxxxxxxxx/app.bsky.feed.post/yyyyyyyyyyyyy
$ bsky repost at://did:plc:xxxxxxxxxxxxxxxxxxxxxxxx/app.bsky.feed.post/yyyyyyyyyyyyy
```

### Extended Usage Information

Individual commands have their own help texts. Call via `-h` / `--help` and the name of the command.

### JSON Output

The output for most commands can be formatted as JSON via `--json`. See Extended Usage Information for the individual commands that support JSON output.

## Installation

Download binary from Release page.

Or install with go install command.

```
go install github.com/mattn/bsky@latest
```

### To enable Autocomplete

Download the correct file from `/scripts` directory and add the following line to your shell configuration file.

ZSH:

```sh
# Add the following line to your .zshrc
source /path/to/autocomplete.zsh
```

Bash:

```bash
# Add the following line to your .bashrc
source /path/to/autocomplete.sh
```

PowerShell:

```powershell
# Add the following line to your $PROFILE
/path/to/autocomplete.ps1
```

## License

MIT

## Author

Yasuhiro Matsumoto (a.k.a. mattn)

================================================
FILE: config.go
================================================
package main

import (
"encoding/json"
"fmt"
"os"
"path/filepath"
"runtime"
"strings"
)

func configDir() (string, error) {
switch runtime.GOOS {
case "darwin":
dir, err := os.UserHomeDir()
if err != nil {
return "", err
}
return filepath.Join(dir, ".config"), nil
default:
return os.UserConfigDir()

    }

}

func loadConfig(profile string) (\*config, string, error) {
dir, err := configDir()
if err != nil {
return nil, "", err
}
dir = filepath.Join(dir, "bsky")

    var fp string
    if profile == "" {
    	fp = filepath.Join(dir, "config.json")
    } else if profile == "?" {
    	names, err := filepath.Glob(filepath.Join(dir, "config-*.json"))
    	if err != nil {
    		return nil, "", err
    	}
    	for _, name := range names {
    		name = filepath.Base(name)
    		name = strings.TrimLeft(name[6:len(name)-5], "-")
    		fmt.Println(name)
    	}
    	os.Exit(0)
    } else {
    	fp = filepath.Join(dir, "config-"+profile+".json")
    }
    os.MkdirAll(filepath.Dir(fp), 0700)

    b, err := os.ReadFile(fp)
    if err != nil {
    	return nil, fp, fmt.Errorf("cannot load config file: %w", err)
    }
    var cfg config
    err = json.Unmarshal(b, &cfg)
    if err != nil {
    	return nil, fp, fmt.Errorf("cannot load config file: %w", err)
    }
    if cfg.Host == "" {
    	cfg.Host = "https://bsky.social"
    }
    cfg.dir = dir
    return &cfg, fp, nil

}

================================================
FILE: extract.go
================================================
package main

import (
"regexp"
"strings"
)

const (
urlPattern = `https?://[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+`
mentionPattern = `@[a-zA-Z0-9.]+`
tagPattern = `\B#\S+`
)

var (
urlRe = regexp.MustCompile(urlPattern)
mentionRe = regexp.MustCompile(mentionPattern)
tagRe = regexp.MustCompile(tagPattern)
)

type entry struct {
start int64
end int64
text string
}

func extractLinks(text string) []entry {
var result []entry
matches := urlRe.FindAllStringSubmatchIndex(text, -1)
for \_, m := range matches {
result = append(result, entry{
text: text[m[0]:m[1]],
start: int64(len([]rune(text[0:m[0]]))),
end: int64(len([]rune(text[0:m[1]])))},
)
}
return result
}

func extractLinksBytes(text string) []entry {
var result []entry
matches := urlRe.FindAllStringSubmatchIndex(text, -1)
for \_, m := range matches {
result = append(result, entry{
text: text[m[0]:m[1]],
start: int64(len(text[0:m[0]])),
end: int64(len(text[0:m[1]]))},
)
}
return result
}

func extractMentions(text string) []entry {
var result []entry
matches := mentionRe.FindAllStringSubmatchIndex(text, -1)
for \_, m := range matches {
result = append(result, entry{
text: strings.TrimPrefix(text[m[0]:m[1]], "@"),
start: int64(len([]rune(text[0:m[0]]))),
end: int64(len([]rune(text[0:m[1]])))},
)
}
return result
}

func extractMentionsBytes(text string) []entry {
var result []entry
matches := mentionRe.FindAllStringSubmatchIndex(text, -1)
for \_, m := range matches {
result = append(result, entry{
text: strings.TrimPrefix(text[m[0]:m[1]], "@"),
start: int64(len(text[0:m[0]])),
end: int64(len(text[0:m[1]]))},
)
}
return result
}

func extractTags(text string) []entry {
var result []entry
matches := tagRe.FindAllStringSubmatchIndex(text, -1)
for \_, m := range matches {
result = append(result, entry{
text: strings.TrimPrefix(text[m[0]:m[1]], "#"),
start: int64(len([]rune(text[0:m[0]]))),
end: int64(len([]rune(text[0:m[1]])))},
)
}
return result
}

func extractTagsBytes(text string) []entry {
var result []entry
matches := tagRe.FindAllStringSubmatchIndex(text, -1)
for \_, m := range matches {
result = append(result, entry{
text: strings.TrimPrefix(text[m[0]:m[1]], "#"),
start: int64(len(text[0:m[0]])),
end: int64(len(text[0:m[1]]))},
)
}
return result
}

================================================
FILE: extract_test.go
================================================
package main

import (
"reflect"
"testing"
)

func TestExtractLinks(t \*testing.T) {
tests := []struct {
name string
input string
want []entry
}{
{name: "1", input: `検索は https://google.com です`, want: []entry{{text: "https://google.com", start: 4, end: 22}}},
{name: "2", input: `https://google.com です`, want: []entry{{text: "https://google.com", start: 0, end: 18}}},
{name: "3", input: `https://google.com`, want: []entry{{text: "https://google.com", start: 0, end: 18}}},
}
for \_, test := range tests {
result := extractLinks(test.input)
if len(result) != len(test.want) {
t.Fatalf("extract %d link(s)", len(test.want))
}
if !reflect.DeepEqual(result, test.want) {
t.Fatalf("want %v but got %v for test %v", test.want, result, test.name)
}
}
}

func TestExtractMentions(t \*testing.T) {
tests := []struct {
name string
input string
want []entry
}{
{name: "1", input: `返事は @mattn へ`, want: []entry{{text: "mattn", start: 4, end: 10}}},
{name: "2", input: `返事は @mattn-- へ`, want: []entry{{text: "mattn", start: 4, end: 10}}},
{name: "3", input: `返事は @mattn.jp へ`, want: []entry{{text: "mattn.jp", start: 4, end: 13}}},
{name: "4", input: `返事は @@mattn へ`, want: []entry{{text: "mattn", start: 5, end: 11}}},
}
for \_, test := range tests {
result := extractMentions(test.input)
if len(result) != len(test.want) {
t.Fatalf("extract %d link(s)", len(test.want))
}
if !reflect.DeepEqual(result, test.want) {
t.Fatalf("want %v but got %v for test %v", test.want, result, test.name)
}
}
}

func TestExtractTags(t \*testing.T) {
tests := []struct {
name string
input string
want []entry
}{
{name: "1", input: `Hi, #Bluesky!`, want: []entry{{text: "Bluesky!", start: 4, end: 13}}},
{name: "2", input: `bsky から#テスト`, want: []entry{{text: "テスト", start: 7, end: 11}}},
{name: "3", input: `Emoji hashtags: #🦋 #🟦🈳 #🌌`, want: []entry{
{text: "🦋", start: 16, end: 18},
{text: "🟦🈳", start: 19, end: 22},
{text: "🌌", start: 23, end: 25},
}},
}
for \_, test := range tests {
result := extractTags(test.input)
if len(result) != len(test.want) {
t.Fatalf("extract %d tag(s)", len(test.want))
}
if !reflect.DeepEqual(result, test.want) {
t.Fatalf("want %v but got %v for test %v", test.want, result, test.name)
}
}
}

================================================
FILE: go.mod
================================================
module github.com/mattn/bsky

go 1.23

toolchain go1.23.1

require (
github.com/PuerkitoBio/goquery v1.10.1
github.com/bluesky-social/indigo v0.0.0-20250107142340-5e1b39404332
github.com/fatih/color v1.18.0
github.com/gorilla/websocket v1.5.3
github.com/ipfs/go-cid v0.4.1
github.com/urfave/cli/v2 v2.27.5
)

require (
github.com/DataDog/zstd v1.5.6 // indirect
github.com/cockroachdb/errors v1.11.3 // indirect
github.com/cockroachdb/fifo v0.0.0-20240816210425-c5d0cb0b6fc0 // indirect
github.com/cockroachdb/logtags v0.0.0-20241215232642-bb51bb14a506 // indirect
github.com/cockroachdb/pebble v1.1.3 // indirect
github.com/cockroachdb/redact v1.1.5 // indirect
github.com/cockroachdb/tokenbucket v0.0.0-20230807174530-cc333fc44b06 // indirect
github.com/getsentry/sentry-go v0.31.1 // indirect
github.com/golang/snappy v0.0.4 // indirect
github.com/klauspost/compress v1.17.11 // indirect
github.com/kr/pretty v0.3.1 // indirect
github.com/kr/text v0.2.0 // indirect
github.com/munnerz/goautoneg v0.0.0-20191010083416-a7dc8b61c822 // indirect
github.com/orandin/slog-gorm v1.4.0 // indirect
github.com/pkg/errors v0.9.1 // indirect
github.com/rogpeppe/go-internal v1.13.1 // indirect
go.opentelemetry.io/auto/sdk v1.1.0 // indirect
)

require (
github.com/RussellLuo/slidingwindow v0.0.0-20200528002341-535bb99d338b // indirect
github.com/andybalholm/cascadia v1.3.3 // indirect
github.com/beorn7/perks v1.0.1 // indirect
github.com/carlmjohnson/versioninfo v0.22.5 // indirect
github.com/cespare/xxhash/v2 v2.3.0 // indirect
github.com/cpuguy83/go-md2man/v2 v2.0.6 // indirect
github.com/decred/dcrd/dcrec/secp256k1/v4 v4.3.0 // indirect
github.com/felixge/httpsnoop v1.0.4 // indirect
github.com/go-logr/logr v1.4.2 // indirect
github.com/go-logr/stdr v1.2.2 // indirect
github.com/goccy/go-json v0.10.4 // indirect
github.com/gogo/protobuf v1.3.2 // indirect
github.com/google/uuid v1.6.0 // indirect
github.com/hashicorp/go-cleanhttp v0.5.2 // indirect
github.com/hashicorp/go-retryablehttp v0.7.7 // indirect
github.com/hashicorp/golang-lru v1.0.2 // indirect
github.com/hashicorp/golang-lru/arc/v2 v2.0.7 // indirect
github.com/hashicorp/golang-lru/v2 v2.0.7 // indirect
github.com/ipfs/bbloom v0.0.4 // indirect
github.com/ipfs/go-block-format v0.2.0 // indirect
github.com/ipfs/go-blockservice v0.5.2 // indirect
github.com/ipfs/go-datastore v0.6.0 // indirect
github.com/ipfs/go-ipfs-blockstore v1.3.1 // indirect
github.com/ipfs/go-ipfs-ds-help v1.1.1 // indirect
github.com/ipfs/go-ipfs-exchange-interface v0.2.1 // indirect
github.com/ipfs/go-ipfs-util v0.0.3 // indirect
github.com/ipfs/go-ipld-cbor v0.2.0 // indirect
github.com/ipfs/go-ipld-format v0.6.0 // indirect
github.com/ipfs/go-ipld-legacy v0.2.1 // indirect
github.com/ipfs/go-libipfs v0.7.0 // indirect
github.com/ipfs/go-log v1.0.5 // indirect
github.com/ipfs/go-log/v2 v2.5.1 // indirect
github.com/ipfs/go-merkledag v0.11.0 // indirect
github.com/ipfs/go-metrics-interface v0.0.1 // indirect
github.com/ipfs/go-verifcid v0.0.3 // indirect
github.com/ipld/go-car v0.6.2 // indirect
github.com/ipld/go-car/v2 v2.14.2 // indirect
github.com/ipld/go-codec-dagpb v1.6.0 // indirect
github.com/ipld/go-ipld-prime v0.21.0 // indirect
github.com/jackc/pgpassfile v1.0.0 // indirect
github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
github.com/jackc/pgx/v5 v5.7.2 // indirect
github.com/jackc/puddle/v2 v2.2.2 // indirect
github.com/jbenet/goprocess v0.1.4 // indirect
github.com/jinzhu/inflection v1.0.0 // indirect
github.com/jinzhu/now v1.1.5 // indirect
github.com/klauspost/cpuid/v2 v2.2.9 // indirect
github.com/lestrrat-go/blackmagic v1.0.2 // indirect
github.com/lestrrat-go/httpcc v1.0.1 // indirect
github.com/lestrrat-go/httprc v1.0.6 // indirect
github.com/lestrrat-go/iter v1.0.2 // indirect
github.com/lestrrat-go/jwx/v2 v2.1.3 // indirect
github.com/lestrrat-go/option v1.0.1 // indirect
github.com/mattn/go-colorable v0.1.13 // indirect
github.com/mattn/go-encoding v0.0.2
github.com/mattn/go-isatty v0.0.20 // indirect
github.com/mattn/go-sqlite3 v1.14.24 // indirect
github.com/minio/sha256-simd v1.0.1 // indirect
github.com/mr-tron/base58 v1.2.0 // indirect
github.com/multiformats/go-base32 v0.1.0 // indirect
github.com/multiformats/go-base36 v0.2.0 // indirect
github.com/multiformats/go-multibase v0.2.0 // indirect
github.com/multiformats/go-multicodec v0.9.0 // indirect
github.com/multiformats/go-multihash v0.2.3 // indirect
github.com/multiformats/go-varint v0.0.7 // indirect
github.com/opentracing/opentracing-go v1.2.0 // indirect
github.com/petar/GoLLRB v0.0.0-20210522233825-ae3b015fd3e9 // indirect
github.com/polydawn/refmt v0.89.1-0.20221221234430-40501e09de1f // indirect
github.com/prometheus/client_golang v1.20.5 // indirect
github.com/prometheus/client_model v0.6.1 // indirect
github.com/prometheus/common v0.61.0 // indirect
github.com/prometheus/procfs v0.15.1 // indirect
github.com/russross/blackfriday/v2 v2.1.0 // indirect
github.com/segmentio/asm v1.2.0 // indirect
github.com/spaolacci/murmur3 v1.1.0 // indirect
github.com/whyrusleeping/cbor v0.0.0-20171005072247-63513f603b11 // indirect
github.com/whyrusleeping/cbor-gen v0.2.1-0.20241030202151-b7a6831be65e // indirect
github.com/whyrusleeping/go-did v0.0.0-20240828165449-bcaa7ae21371 // indirect
github.com/xrash/smetrics v0.0.0-20240521201337-686a1a2994c1 // indirect
gitlab.com/yawning/secp256k1-voi v0.0.0-20230925100816-f2616030848b // indirect
gitlab.com/yawning/tuplehash v0.0.0-20230713102510-df83abbf9a02 // indirect
go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp v0.58.0 // indirect
go.opentelemetry.io/otel v1.33.0 // indirect
go.opentelemetry.io/otel/metric v1.33.0 // indirect
go.opentelemetry.io/otel/trace v1.33.0 // indirect
go.uber.org/atomic v1.11.0 // indirect
go.uber.org/multierr v1.11.0 // indirect
go.uber.org/zap v1.27.0 // indirect
golang.org/x/crypto v0.32.0 // indirect
golang.org/x/exp v0.0.0-20250106191152-7588d65b2ba8 // indirect
golang.org/x/net v0.34.0
golang.org/x/sync v0.10.0 // indirect
golang.org/x/sys v0.29.0 // indirect
golang.org/x/text v0.21.0 // indirect
golang.org/x/xerrors v0.0.0-20240903120638-7835f813f4da // indirect
google.golang.org/protobuf v1.36.2 // indirect
gorm.io/driver/postgres v1.5.11 // indirect
gorm.io/driver/sqlite v1.5.7 // indirect
gorm.io/gorm v1.25.12 // indirect
lukechampine.com/blake3 v1.3.0 // indirect
)

//replace github.com/bluesky-social/indigo => /home/mattn/dev/indigo

================================================
FILE: go.sum
================================================
github.com/BurntSushi/toml v0.3.1/go.mod h1:xHWCNGjB5oqiDr8zfno3MHue2Ht5sIBksp03qcyfWMU=
github.com/DataDog/zstd v1.5.6 h1:LbEglqepa/ipmmQJUDnSsfvA8e8IStVcGaFWDuxvGOY=
github.com/DataDog/zstd v1.5.6/go.mod h1:g4AWEaM3yOg3HYfnJ3YIawPnVdXJh9QME85blwSAmyw=
github.com/PuerkitoBio/goquery v1.10.1 h1:Y8JGYUkXWTGRB6Ars3+j3kN0xg1YqqlwvdTV8WTFQcU=
github.com/PuerkitoBio/goquery v1.10.1/go.mod h1:IYiHrOMps66ag56LEH7QYDDupKXyo5A8qrjIx3ZtujY=
github.com/RussellLuo/slidingwindow v0.0.0-20200528002341-535bb99d338b h1:5/++qT1/z812ZqBvqQt6ToRswSuPZ/B33m6xVHRzADU=
github.com/RussellLuo/slidingwindow v0.0.0-20200528002341-535bb99d338b/go.mod h1:4+EPqMRApwwE/6yo6CxiHoSnBzjRr3jsqer7frxP8y4=
github.com/alexbrainman/goissue34681 v0.0.0-20191006012335-3fc7a47baff5 h1:iW0a5ljuFxkLGPNem5Ui+KBjFJzKg4Fv2fnxe4dvzpM=
github.com/alexbrainman/goissue34681 v0.0.0-20191006012335-3fc7a47baff5/go.mod h1:Y2QMoi1vgtOIfc+6DhrMOGkLoGzqSV2rKp4Sm+opsyA=
github.com/andybalholm/cascadia v1.3.3 h1:AG2YHrzJIm4BZ19iwJ/DAua6Btl3IwJX+VI4kktS1LM=
github.com/andybalholm/cascadia v1.3.3/go.mod h1:xNd9bqTn98Ln4DwST8/nG+H0yuB8Hmgu1YHNnWw0GeA=
github.com/benbjohnson/clock v1.1.0/go.mod h1:J11/hYXuz8f4ySSvYwY0FKfm+ezbsZBKZxNJlLklBHA=
github.com/benbjohnson/clock v1.3.0 h1:ip6w0uFQkncKQ979AypyG0ER7mqUSBdKLOgAle/AT8A=
github.com/benbjohnson/clock v1.3.0/go.mod h1:J11/hYXuz8f4ySSvYwY0FKfm+ezbsZBKZxNJlLklBHA=
github.com/beorn7/perks v1.0.1 h1:VlbKKnNfV8bJzeqoa4cOKqO6bYr3WgKZxO8Z16+hsOM=
github.com/beorn7/perks v1.0.1/go.mod h1:G2ZrVWU2WbWT9wwq4/hrbKbnv/1ERSJQ0ibhJ6rlkpw=
github.com/bluesky-social/indigo v0.0.0-20250107142340-5e1b39404332 h1:1HPsct2XxiBm5Mx4Nvr/6rgKzGpae8vsSVPdpjZZEGk=
github.com/bluesky-social/indigo v0.0.0-20250107142340-5e1b39404332/go.mod h1:UPvCalsPWViUSB6t11u6jg5lF1kLLsaX5t3ybzTSyeE=
github.com/carlmjohnson/versioninfo v0.22.5 h1:O00sjOLUAFxYQjlN/bzYTuZiS0y6fWDQjMRvwtKgwwc=
github.com/carlmjohnson/versioninfo v0.22.5/go.mod h1:QT9mph3wcVfISUKd0i9sZfVrPviHuSF+cUtLjm2WSf8=
github.com/cespare/xxhash/v2 v2.3.0 h1:UL815xU9SqsFlibzuggzjXhog7bL6oX9BbNZnL2UFvs=
github.com/cespare/xxhash/v2 v2.3.0/go.mod h1:VGX0DQ3Q6kWi7AoAeZDth3/j3BFtOZR5XLFGgcrjCOs=
github.com/cockroachdb/datadriven v1.0.3-0.20230413201302-be42291fc80f h1:otljaYPt5hWxV3MUfO5dFPFiOXg9CyG5/kCfayTqsJ4=
github.com/cockroachdb/datadriven v1.0.3-0.20230413201302-be42291fc80f/go.mod h1:a9RdTaap04u637JoCzcUoIcDmvwSUtcUFtT/C3kJlTU=
github.com/cockroachdb/errors v1.11.3 h1:5bA+k2Y6r+oz/6Z/RFlNeVCesGARKuC6YymtcDrbC/I=
github.com/cockroachdb/errors v1.11.3/go.mod h1:m4UIW4CDjx+R5cybPsNrRbreomiFqt8o1h1wUVazSd8=
github.com/cockroachdb/fifo v0.0.0-20240816210425-c5d0cb0b6fc0 h1:pU88SPhIFid6/k0egdR5V6eALQYq2qbSmukrkgIh/0A=
github.com/cockroachdb/fifo v0.0.0-20240816210425-c5d0cb0b6fc0/go.mod h1:9/y3cnZ5GKakj/H4y9r9GTjCvAFta7KLgSHPJJYc52M=
github.com/cockroachdb/logtags v0.0.0-20241215232642-bb51bb14a506 h1:ASDL+UJcILMqgNeV5jiqR4j+sTuvQNHdf2chuKj1M5k=
github.com/cockroachdb/logtags v0.0.0-20241215232642-bb51bb14a506/go.mod h1:Mw7HqKr2kdtu6aYGn3tPmAftiP3QPX63LdK/zcariIo=
github.com/cockroachdb/pebble v1.1.3 h1:GM5YY3Yb09KCGUQoyWdi3vsLErXHsmc3qRRWsX+tBqw=
github.com/cockroachdb/pebble v1.1.3/go.mod h1:4exszw1r40423ZsmkG/09AFEG83I0uDgfujJdbL6kYU=
github.com/cockroachdb/redact v1.1.5 h1:u1PMllDkdFfPWaNGMyLD1+so+aq3uUItthCFqzwPJ30=
github.com/cockroachdb/redact v1.1.5/go.mod h1:BVNblN9mBWFyMyqK1k3AAiSxhvhfK2oOZZ2lK+dpvRg=
github.com/cockroachdb/tokenbucket v0.0.0-20230807174530-cc333fc44b06 h1:zuQyyAKVxetITBuuhv3BI9cMrmStnpT18zmgmTxunpo=
github.com/cockroachdb/tokenbucket v0.0.0-20230807174530-cc333fc44b06/go.mod h1:7nc4anLGjupUW/PeY5qiNYsdNXj7zopG+eqsS7To5IQ=
github.com/cpuguy83/go-md2man/v2 v2.0.0-20190314233015-f79a8a8ca69d/go.mod h1:maD7wRr/U5Z6m/iR4s+kqSMx2CaBsrgA7czyZG/E6dU=
github.com/cpuguy83/go-md2man/v2 v2.0.6 h1:XJtiaUW6dEEqVuZiMTn1ldk455QWwEIsMIJlo5vtkx0=
github.com/cpuguy83/go-md2man/v2 v2.0.6/go.mod h1:oOW0eioCTA6cOiMLiUPZOpcVxMig6NIQQ7OS05n1F4g=
github.com/creack/pty v1.1.9/go.mod h1:oKZEueFk5CKHvIhNR5MUki03XCEU+Q6VDXinZuGJ33E=
github.com/cskr/pubsub v1.0.2 h1:vlOzMhl6PFn60gRlTQQsIfVwaPB/B/8MziK8FhEPt/0=
github.com/cskr/pubsub v1.0.2/go.mod h1:/8MzYXk/NJAz782G8RPkFzXTZVu63VotefPnR9TIRis=
github.com/davecgh/go-spew v1.1.0/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/davecgh/go-spew v1.1.1 h1:vj9j/u1bqnvCEfJOwUhtlOARqs3+rkHYY13jYWTU97c=
github.com/davecgh/go-spew v1.1.1/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/decred/dcrd/dcrec/secp256k1/v4 v4.3.0 h1:rpfIENRNNilwHwZeG5+P150SMrnNEcHYvcCuK6dPZSg=
github.com/decred/dcrd/dcrec/secp256k1/v4 v4.3.0/go.mod h1:v57UDF4pDQJcEfFUCRop3lJL149eHGSe9Jvczhzjo/0=
github.com/fatih/color v1.18.0 h1:S8gINlzdQ840/4pfAwic/ZE0djQEH3wM94VfqLTZcOM=
github.com/fatih/color v1.18.0/go.mod h1:4FelSpRwEGDpQ12mAdzqdOukCy4u8WUtOY6lkT/6HfU=
github.com/felixge/httpsnoop v1.0.4 h1:NFTV2Zj1bL4mc9sqWACXbQFVBBg2W3GPvqp8/ESS2Wg=
github.com/felixge/httpsnoop v1.0.4/go.mod h1:m8KPJKqk1gH5J9DgRY2ASl2lWCfGKXixSwevea8zH2U=
github.com/frankban/quicktest v1.14.6 h1:7Xjx+VpznH+oBnejlPUj8oUpdxnVs4f8XU8WnHkI4W8=
github.com/frankban/quicktest v1.14.6/go.mod h1:4ptaffx2x8+WTWXmUCuVU6aPUX1/Mz7zb5vbUoiM6w0=
github.com/getsentry/sentry-go v0.31.1 h1:ELVc0h7gwyhnXHDouXkhqTFSO5oslsRDk0++eyE0KJ4=
github.com/getsentry/sentry-go v0.31.1/go.mod h1:CYNcMMz73YigoHljQRG+qPF+eMq8gG72XcGN/p71BAY=
github.com/go-errors/errors v1.4.2 h1:J6MZopCL4uSllY1OfXM374weqZFFItUbrImctkmUxIA=
github.com/go-errors/errors v1.4.2/go.mod h1:sIVyrIiJhuEF+Pj9Ebtd6P/rEYROXFi3BopGUQ5a5Og=
github.com/go-logr/logr v1.2.2/go.mod h1:jdQByPbusPIv2/zmleS9BjJVeZ6kBagPoEUsqbVz/1A=
github.com/go-logr/logr v1.4.2 h1:6pFjapn8bFcIbiKo3XT4j/BhANplGihG6tvd+8rYgrY=
github.com/go-logr/logr v1.4.2/go.mod h1:9T104GzyrTigFIr8wt5mBrctHMim0Nb2HLGrmQ40KvY=
github.com/go-logr/stdr v1.2.2 h1:hSWxHoqTgW2S2qGc0LTAI563KZ5YKYRhT3MFKZMbjag=
github.com/go-logr/stdr v1.2.2/go.mod h1:mMo/vtBO5dYbehREoey6XUKy/eSumjCCveDpRre4VKE=
github.com/go-redis/redis v6.15.9+incompatible h1:K0pv1D7EQUjfyoMql+r/jZqCLizCGKFlFgcHWWmHQjg=
github.com/go-redis/redis v6.15.9+incompatible/go.mod h1:NAIEuMOZ/fxfXJIrKDQDz8wamY7mA7PouImQ2Jvg6kA=
github.com/go-yaml/yaml v2.1.0+incompatible/go.mod h1:w2MrLa16VYP0jy6N7M5kHaCkaLENm+P+Tv+MfurjSw0=
github.com/goccy/go-json v0.10.4 h1:JSwxQzIqKfmFX1swYPpUThQZp/Ka4wzJdK0LWVytLPM=
github.com/goccy/go-json v0.10.4/go.mod h1:oq7eo15ShAhp70Anwd5lgX2pLfOS3QCiwU/PULtXL6M=
github.com/gogo/protobuf v1.3.2 h1:Ov1cvc58UF3b5XjBnZv7+opcTcQFZebYjWzi34vdm4Q=
github.com/gogo/protobuf v1.3.2/go.mod h1:P1XiOD3dCwIKUDQYPy72D8LYyHL2YPYrpS2s69NZV8Q=
github.com/golang/snappy v0.0.4 h1:yAGX7huGHXlcLOEtBnF4w7FQwA26wojNCwOYAEhLjQM=
github.com/golang/snappy v0.0.4/go.mod h1:/XxbfmMg8lxefKM7IXC3fBNl/7bRcc72aCRzEWrmP2Q=
github.com/google/go-cmp v0.6.0 h1:ofyhxvXcZhMsU5ulbFiLKl/XBFqE1GSq7atu8tAmTRI=
github.com/google/go-cmp v0.6.0/go.mod h1:17dUlkBOakJ0+DkrSSNjCkIjxS6bF9zb3elmeNGIjoY=
github.com/google/gopacket v1.1.19 h1:ves8RnFZPGiFnTS0uPQStjwru6uO6h+nlr9j6fL7kF8=
github.com/google/gopacket v1.1.19/go.mod h1:iJ8V8n6KS+z2U1A8pUwu8bW5SyEMkXJB8Yo/Vo+TKTo=
github.com/google/renameio v0.1.0/go.mod h1:KWCgfxg9yswjAJkECMjeO8J8rahYeXnNhOm40UhjYkI=
github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=
github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=
github.com/gopherjs/gopherjs v0.0.0-20181017120253-0766667cb4d1 h1:EGx4pi6eqNxGaHF6qqu48+N2wcFQ5qg5FXgOdqsJ5d8=
github.com/gopherjs/gopherjs v0.0.0-20181017120253-0766667cb4d1/go.mod h1:wJfORRmW1u3UXTncJ5qlYoELFm8eSnnEO6hX4iZ3EWY=
github.com/gorilla/websocket v1.5.3 h1:saDtZ6Pbx/0u+bgYQ3q96pZgCzfhKXGPqt7kZ72aNNg=
github.com/gorilla/websocket v1.5.3/go.mod h1:YR8l580nyteQvAITg2hZ9XVh4b55+EU/adAjf1fMHhE=
github.com/hashicorp/go-cleanhttp v0.5.2 h1:035FKYIWjmULyFRBKPs8TBQoi0x6d9G4xc9neXJWAZQ=
github.com/hashicorp/go-cleanhttp v0.5.2/go.mod h1:kO/YDlP8L1346E6Sodw+PrpBSV4/SoxCXGY6BqNFT48=
github.com/hashicorp/go-hclog v1.6.3 h1:Qr2kF+eVWjTiYmU7Y31tYlP1h0q/X3Nl3tPGdaB11/k=
github.com/hashicorp/go-hclog v1.6.3/go.mod h1:W4Qnvbt70Wk/zYJryRzDRU/4r0kIg0PVHBcfoyhpF5M=
github.com/hashicorp/go-retryablehttp v0.7.7 h1:C8hUCYzor8PIfXHa4UrZkU4VvK8o9ISHxT2Q8+VepXU=
github.com/hashicorp/go-retryablehttp v0.7.7/go.mod h1:pkQpWZeYWskR+D1tR2O5OcBFOxfA7DoAO6xtkuQnHTk=
github.com/hashicorp/golang-lru v1.0.2 h1:dV3g9Z/unq5DpblPpw+Oqcv4dU/1omnb4Ok8iPY6p1c=
github.com/hashicorp/golang-lru v1.0.2/go.mod h1:iADmTwqILo4mZ8BN3D2Q6+9jd8WM5uGBxy+E8yxSoD4=
github.com/hashicorp/golang-lru/arc/v2 v2.0.7 h1:QxkVTxwColcduO+LP7eJO56r2hFiG8zEbfAAzRv52KQ=
github.com/hashicorp/golang-lru/arc/v2 v2.0.7/go.mod h1:Pe7gBlGdc8clY5LJ0LpJXMt5AmgmWNH1g+oFFVUHOEc=
github.com/hashicorp/golang-lru/v2 v2.0.7 h1:a+bsQ5rvGLjzHuww6tVxozPZFVghXaHOwFs4luLUK2k=
github.com/hashicorp/golang-lru/v2 v2.0.7/go.mod h1:QeFd9opnmA6QUJc5vARoKUSoFhyfM2/ZepoAG6RGpeM=
github.com/huin/goupnp v1.0.3 h1:N8No57ls+MnjlB+JPiCVSOyy/ot7MJTqlo7rn+NYSqQ=
github.com/huin/goupnp v1.0.3/go.mod h1:ZxNlw5WqJj6wSsRK5+YfflQGXYfccj5VgQsMNixHM7Y=
github.com/ipfs/bbloom v0.0.4 h1:Gi+8EGJ2y5qiD5FbsbpX/TMNcJw8gSqr7eyjHa4Fhvs=
github.com/ipfs/bbloom v0.0.4/go.mod h1:cS9YprKXpoZ9lT0n/Mw/a6/aFV6DTjTLYHeA+gyqMG0=
github.com/ipfs/boxo v0.22.0 h1:QTC+P5uhsBNq6HzX728nsLyFW6rYDeR/5hggf9YZX78=
github.com/ipfs/boxo v0.22.0/go.mod h1:yp1loimX0BDYOR0cyjtcXHv15muEh5V1FqO2QLlzykw=
github.com/ipfs/go-bitfield v1.1.0 h1:fh7FIo8bSwaJEh6DdTWbCeZ1eqOaOkKFI74SCnsWbGA=
github.com/ipfs/go-bitfield v1.1.0/go.mod h1:paqf1wjq/D2BBmzfTVFlJQ9IlFOZpg422HL0HqsGWHU=
github.com/ipfs/go-bitswap v0.11.0 h1:j1WVvhDX1yhG32NTC9xfxnqycqYIlhzEzLXG/cU1HyQ=
github.com/ipfs/go-bitswap v0.11.0/go.mod h1:05aE8H3XOU+LXpTedeAS0OZpcO1WFsj5niYQH9a1Tmk=
github.com/ipfs/go-block-format v0.2.0 h1:ZqrkxBA2ICbDRbK8KJs/u0O3dlp6gmAuuXUJNiW1Ycs=
github.com/ipfs/go-block-format v0.2.0/go.mod h1:+jpL11nFx5A/SPpsoBn6Bzkra/zaArfSmsknbPMYgzM=
github.com/ipfs/go-blockservice v0.5.2 h1:in9Bc+QcXwd1apOVM7Un9t8tixPKdaHQFdLSUM1Xgk8=
github.com/ipfs/go-blockservice v0.5.2/go.mod h1:VpMblFEqG67A/H2sHKAemeH9vlURVavlysbdUI632yk=
github.com/ipfs/go-bs-sqlite3 v0.0.0-20221122195556-bfcee1be620d h1:9V+GGXCuOfDiFpdAHz58q9mKLg447xp0cQKvqQrAwYE=
github.com/ipfs/go-bs-sqlite3 v0.0.0-20221122195556-bfcee1be620d/go.mod h1:pMbnFyNAGjryYCLCe59YDLRv/ujdN+zGJBT1umlvYRM=
github.com/ipfs/go-cid v0.4.1 h1:A/T3qGvxi4kpKWWcPC/PgbvDA2bjVLO7n4UeVwnbs/s=
github.com/ipfs/go-cid v0.4.1/go.mod h1:uQHwDeX4c6CtyrFwdqyhpNcxVewur1M7l7fNU7LKwZk=
github.com/ipfs/go-datastore v0.6.0 h1:JKyz+Gvz1QEZw0LsX1IBn+JFCJQH4SJVFtM4uWU0Myk=
github.com/ipfs/go-datastore v0.6.0/go.mod h1:rt5M3nNbSO/8q1t4LNkLyUwRs8HupMeN/8O4Vn9YAT8=
github.com/ipfs/go-detect-race v0.0.1 h1:qX/xay2W3E4Q1U7d9lNs1sU9nvguX0a7319XbyQ6cOk=
github.com/ipfs/go-detect-race v0.0.1/go.mod h1:8BNT7shDZPo99Q74BpGMK+4D8Mn4j46UU0LZ723meps=
github.com/ipfs/go-ds-flatfs v0.5.1 h1:ZCIO/kQOS/PSh3vcF1H6a8fkRGS7pOfwfPdx4n/KJH4=
github.com/ipfs/go-ds-flatfs v0.5.1/go.mod h1:RWTV7oZD/yZYBKdbVIFXTX2fdY2Tbvl94NsWqmoyAX4=
github.com/ipfs/go-ipfs-blockstore v1.3.1 h1:cEI9ci7V0sRNivqaOr0elDsamxXFxJMMMy7PTTDQNsQ=
github.com/ipfs/go-ipfs-blockstore v1.3.1/go.mod h1:KgtZyc9fq+P2xJUiCAzbRdhhqJHvsw8u2Dlqy2MyRTE=
github.com/ipfs/go-ipfs-blocksutil v0.0.1 h1:Eh/H4pc1hsvhzsQoMEP3Bke/aW5P5rVM1IWFJMcGIPQ=
github.com/ipfs/go-ipfs-blocksutil v0.0.1/go.mod h1:Yq4M86uIOmxmGPUHv/uI7uKqZNtLb449gwKqXjIsnRk=
github.com/ipfs/go-ipfs-delay v0.0.1 h1:r/UXYyRcddO6thwOnhiznIAiSvxMECGgtv35Xs1IeRQ=
github.com/ipfs/go-ipfs-delay v0.0.1/go.mod h1:8SP1YXK1M1kXuc4KJZINY3TQQ03J2rwBG9QfXmbRPrw=
github.com/ipfs/go-ipfs-ds-help v1.1.1 h1:B5UJOH52IbcfS56+Ul+sv8jnIV10lbjLF5eOO0C66Nw=
github.com/ipfs/go-ipfs-ds-help v1.1.1/go.mod h1:75vrVCkSdSFidJscs8n4W+77AtTpCIAdDGAwjitJMIo=
github.com/ipfs/go-ipfs-exchange-interface v0.2.1 h1:jMzo2VhLKSHbVe+mHNzYgs95n0+t0Q69GQ5WhRDZV/s=
github.com/ipfs/go-ipfs-exchange-interface v0.2.1/go.mod h1:MUsYn6rKbG6CTtsDp+lKJPmVt3ZrCViNyH3rfPGsZ2E=
github.com/ipfs/go-ipfs-exchange-offline v0.3.0 h1:c/Dg8GDPzixGd0MC8Jh6mjOwU57uYokgWRFidfvEkuA=
github.com/ipfs/go-ipfs-exchange-offline v0.3.0/go.mod h1:MOdJ9DChbb5u37M1IcbrRB02e++Z7521fMxqCNRrz9s=
github.com/ipfs/go-ipfs-pq v0.0.3 h1:YpoHVJB+jzK15mr/xsWC574tyDLkezVrDNeaalQBsTE=
github.com/ipfs/go-ipfs-pq v0.0.3/go.mod h1:btNw5hsHBpRcSSgZtiNm/SLj5gYIZ18AKtv3kERkRb4=
github.com/ipfs/go-ipfs-routing v0.3.0 h1:9W/W3N+g+y4ZDeffSgqhgo7BsBSJwPMcyssET9OWevc=
github.com/ipfs/go-ipfs-routing v0.3.0/go.mod h1:dKqtTFIql7e1zYsEuWLyuOU+E0WJWW8JjbTPLParDWo=
github.com/ipfs/go-ipfs-util v0.0.3 h1:2RFdGez6bu2ZlZdI+rWfIdbQb1KudQp3VGwPtdNCmE0=
github.com/ipfs/go-ipfs-util v0.0.3/go.mod h1:LHzG1a0Ig4G+iZ26UUOMjHd+lfM84LZCrn17xAKWBvs=
github.com/ipfs/go-ipld-cbor v0.2.0 h1:VHIW3HVIjcMd8m4ZLZbrYpwjzqlVUfjLM7oK4T5/YF0=
github.com/ipfs/go-ipld-cbor v0.2.0/go.mod h1:Cp8T7w1NKcu4AQJLqK0tWpd1nkgTxEVB5C6kVpLW6/0=
github.com/ipfs/go-ipld-format v0.6.0 h1:VEJlA2kQ3LqFSIm5Vu6eIlSxD/Ze90xtc4Meten1F5U=
github.com/ipfs/go-ipld-format v0.6.0/go.mod h1:g4QVMTn3marU3qXchwjpKPKgJv+zF+OlaKMyhJ4LHPg=
github.com/ipfs/go-ipld-legacy v0.2.1 h1:mDFtrBpmU7b//LzLSypVrXsD8QxkEWxu5qVxN99/+tk=
github.com/ipfs/go-ipld-legacy v0.2.1/go.mod h1:782MOUghNzMO2DER0FlBR94mllfdCJCkTtDtPM51otM=
github.com/ipfs/go-libipfs v0.7.0 h1:Mi54WJTODaOL2/ZSm5loi3SwI3jI2OuFWUrQIkJ5cpM=
github.com/ipfs/go-libipfs v0.7.0/go.mod h1:KsIf/03CqhICzyRGyGo68tooiBE2iFbI/rXW7FhAYr0=
github.com/ipfs/go-log v1.0.5 h1:2dOuUCB1Z7uoczMWgAyDck5JLb72zHzrMnGnCNNbvY8=
github.com/ipfs/go-log v1.0.5/go.mod h1:j0b8ZoR+7+R99LD9jZ6+AJsrzkPbSXbZfGakb5JPtIo=
github.com/ipfs/go-log/v2 v2.1.3/go.mod h1:/8d0SH3Su5Ooc31QlL1WysJhvyOTDCjcCZ9Axpmri6g=
github.com/ipfs/go-log/v2 v2.5.1 h1:1XdUzF7048prq4aBjDQQ4SL5RxftpRGdXhNRwKSAlcY=
github.com/ipfs/go-log/v2 v2.5.1/go.mod h1:prSpmC1Gpllc9UYWxDiZDreBYw7zp4Iqp1kOLU9U5UI=
github.com/ipfs/go-merkledag v0.11.0 h1:DgzwK5hprESOzS4O1t/wi6JDpyVQdvm9Bs59N/jqfBY=
github.com/ipfs/go-merkledag v0.11.0/go.mod h1:Q4f/1ezvBiJV0YCIXvt51W/9/kqJGH4I1LsA7+djsM4=
github.com/ipfs/go-metrics-interface v0.0.1 h1:j+cpbjYvu4R8zbleSs36gvB7jR+wsL2fGD6n0jO4kdg=
github.com/ipfs/go-metrics-interface v0.0.1/go.mod h1:6s6euYU4zowdslK0GKHmqaIZ3j/b/tL7HTWtJ4VPgWY=
github.com/ipfs/go-peertaskqueue v0.8.1 h1:YhxAs1+wxb5jk7RvS0LHdyiILpNmRIRnZVztekOF0pg=
github.com/ipfs/go-peertaskqueue v0.8.1/go.mod h1:Oxxd3eaK279FxeydSPPVGHzbwVeHjatZ2GA8XD+KbPU=
github.com/ipfs/go-unixfsnode v1.9.1 h1:2cdSIDQCt7emNhlyUqUFQnKo2XvecARoIcurIKFjPD8=
github.com/ipfs/go-unixfsnode v1.9.1/go.mod h1:u8WxhmXzyrq3xfSYkhfx+uI+n91O+0L7KFjq3TS7d6g=
github.com/ipfs/go-verifcid v0.0.3 h1:gmRKccqhWDocCRkC+a59g5QW7uJw5bpX9HWBevXa0zs=
github.com/ipfs/go-verifcid v0.0.3/go.mod h1:gcCtGniVzelKrbk9ooUSX/pM3xlH73fZZJDzQJRvOUw=
github.com/ipld/go-car v0.6.2 h1:Hlnl3Awgnq8icK+ze3iRghk805lu8YNq3wlREDTF2qc=
github.com/ipld/go-car v0.6.2/go.mod h1:oEGXdwp6bmxJCZ+rARSkDliTeYnVzv3++eXajZ+Bmr8=
github.com/ipld/go-car/v2 v2.14.2 h1:9ERr7KXpCC7If0rChZLhYDlyr6Bes6yRKPJnCO3hdHY=
github.com/ipld/go-car/v2 v2.14.2/go.mod h1:0iPB/825lTZLU2zPK5bVTk/R3V2612E1VI279OGSXWA=
github.com/ipld/go-codec-dagpb v1.6.0 h1:9nYazfyu9B1p3NAgfVdpRco3Fs2nFC72DqVsMj6rOcc=
github.com/ipld/go-codec-dagpb v1.6.0/go.mod h1:ANzFhfP2uMJxRBr8CE+WQWs5UsNa0pYtmKZ+agnUw9s=
github.com/ipld/go-ipld-prime v0.21.0 h1:n4JmcpOlPDIxBcY037SVfpd1G+Sj1nKZah0m6QH9C2E=
github.com/ipld/go-ipld-prime v0.21.0/go.mod h1:3RLqy//ERg/y5oShXXdx5YIp50cFGOanyMctpPjsvxQ=
github.com/ipld/go-ipld-prime/storage/bsadapter v0.0.0-20230102063945-1a409dc236dd h1:gMlw/MhNr2Wtp5RwGdsW23cs+yCuj9k2ON7i9MiJlRo=
github.com/ipld/go-ipld-prime/storage/bsadapter v0.0.0-20230102063945-1a409dc236dd/go.mod h1:wZ8hH8UxeryOs4kJEJaiui/s00hDSbE37OKsL47g+Sw=
github.com/jackc/pgpassfile v1.0.0 h1:/6Hmqy13Ss2zCq62VdNG8tM1wchn8zjSGOBJ6icpsIM=
github.com/jackc/pgpassfile v1.0.0/go.mod h1:CEx0iS5ambNFdcRtxPj5JhEz+xB6uRky5eyVu/W2HEg=
github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 h1:iCEnooe7UlwOQYpKFhBabPMi4aNAfoODPEFNiAnClxo=
github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761/go.mod h1:5TJZWKEWniPve33vlWYSoGYefn3gLQRzjfDlhSJ9ZKM=
github.com/jackc/pgx/v5 v5.7.2 h1:mLoDLV6sonKlvjIEsV56SkWNCnuNv531l94GaIzO+XI=
github.com/jackc/pgx/v5 v5.7.2/go.mod h1:ncY89UGWxg82EykZUwSpUKEfccBGGYq1xjrOpsbsfGQ=
github.com/jackc/puddle/v2 v2.2.2 h1:PR8nw+E/1w0GLuRFSmiioY6UooMp6KJv0/61nB7icHo=
github.com/jackc/puddle/v2 v2.2.2/go.mod h1:vriiEXHvEE654aYKXXjOvZM39qJ0q+azkZFrfEOc3H4=
github.com/jackpal/go-nat-pmp v1.0.2 h1:KzKSgb7qkJvOUTqYl9/Hg/me3pWgBmERKrTGD7BdWus=
github.com/jackpal/go-nat-pmp v1.0.2/go.mod h1:QPH045xvCAeXUZOxsnwmrtiCoxIr9eob+4orBN1SBKc=
github.com/jbenet/go-cienv v0.1.0/go.mod h1:TqNnHUmJgXau0nCzC7kXWeotg3J9W34CUv5Djy1+FlA=
github.com/jbenet/goprocess v0.1.4 h1:DRGOFReOMqqDNXwW70QkacFW0YN9QnwLV0Vqk+3oU0o=
github.com/jbenet/goprocess v0.1.4/go.mod h1:5yspPrukOVuOLORacaBi858NqyClJPQxYZlqdZVfqY4=
github.com/jinzhu/inflection v1.0.0 h1:K317FqzuhWc8YvSVlFMCCUb36O/S9MCKRDI7QkRKD/E=
github.com/jinzhu/inflection v1.0.0/go.mod h1:h+uFLlag+Qp1Va5pdKtLDYj+kHp5pxUVkryuEj+Srlc=
github.com/jinzhu/now v1.1.5 h1:/o9tlHleP7gOFmsnYNz3RGnqzefHA47wQpKrrdTIwXQ=
github.com/jinzhu/now v1.1.5/go.mod h1:d3SSVoowX0Lcu0IBviAWJpolVfI5UJVZZ7cO71lE/z8=
github.com/jtolds/gls v4.20.0+incompatible h1:xdiiI2gbIgH/gLH7ADydsJ1uDOEzR8yvV7C0MuV77Wo=
github.com/jtolds/gls v4.20.0+incompatible/go.mod h1:QJZ7F/aHp+rZTRtaJ1ow/lLfFfVYBRgL+9YlvaHOwJU=
github.com/kisielk/errcheck v1.5.0/go.mod h1:pFxgyoBC7bSaBwPgfKdkLd5X25qrDl4LWUI2bnpBCr8=
github.com/kisielk/gotool v1.0.0/go.mod h1:XhKaO+MFFWcvkIS/tQcRk01m1F5IRFswLeQ+oQHNcck=
github.com/klauspost/compress v1.17.11 h1:In6xLpyWOi1+C7tXUUWv2ot1QvBjxevKAaI6IXrJmUc=
github.com/klauspost/compress v1.17.11/go.mod h1:pMDklpSncoRMuLFrf1W9Ss9KT+0rH90U12bZKk7uwG0=
github.com/klauspost/cpuid/v2 v2.2.9 h1:66ze0taIn2H33fBvCkXuv9BmCwDfafmiIVpKV9kKGuY=
github.com/klauspost/cpuid/v2 v2.2.9/go.mod h1:rqkxqrZ1EhYM9G+hXH7YdowN5R5RGN6NK4QwQ3WMXF8=
github.com/koron/go-ssdp v0.0.3 h1:JivLMY45N76b4p/vsWGOKewBQu6uf39y8l+AQ7sDKx8=
github.com/koron/go-ssdp v0.0.3/go.mod h1:b2MxI6yh02pKrsyNoQUsk4+YNikaGhe4894J+Q5lDvA=
github.com/kr/pretty v0.1.0/go.mod h1:dAy3ld7l9f0ibDNOQOHHMYYIIbhfbHSm3C4ZsoJORNo=
github.com/kr/pretty v0.3.1 h1:flRD4NNwYAUpkphVc1HcthR4KEIFJ65n8Mw5qdRn3LE=
github.com/kr/pretty v0.3.1/go.mod h1:hoEshYVHaxMs3cyo3Yncou5ZscifuDolrwPKZanG3xk=
github.com/kr/pty v1.1.1/go.mod h1:pFQYn66WHrOpPYNljwOMqo10TkYh1fy3cYio2l3bCsQ=
github.com/kr/text v0.1.0/go.mod h1:4Jbv+DJW3UT/LiOwJeYQe1efqtUx/iVham/4vfdArNI=
github.com/kr/text v0.2.0 h1:5Nx0Ya0ZqY2ygV366QzturHI13Jq95ApcVaJBhpS+AY=
github.com/kr/text v0.2.0/go.mod h1:eLer722TekiGuMkidMxC/pM04lWEeraHUUmBw8l2grE=
github.com/lestrrat-go/blackmagic v1.0.2 h1:Cg2gVSc9h7sz9NOByczrbUvLopQmXrfFx//N+AkAr5k=
github.com/lestrrat-go/blackmagic v1.0.2/go.mod h1:UrEqBzIR2U6CnzVyUtfM6oZNMt/7O7Vohk2J0OGSAtU=
github.com/lestrrat-go/httpcc v1.0.1 h1:ydWCStUeJLkpYyjLDHihupbn2tYmZ7m22BGkcvZZrIE=
github.com/lestrrat-go/httpcc v1.0.1/go.mod h1:qiltp3Mt56+55GPVCbTdM9MlqhvzyuL6W/NMDA8vA5E=
github.com/lestrrat-go/httprc v1.0.6 h1:qgmgIRhpvBqexMJjA/PmwSvhNk679oqD1RbovdCGW8k=
github.com/lestrrat-go/httprc v1.0.6/go.mod h1:mwwz3JMTPBjHUkkDv/IGJ39aALInZLrhBp0X7KGUZlo=
github.com/lestrrat-go/iter v1.0.2 h1:gMXo1q4c2pHmC3dn8LzRhJfP1ceCbgSiT9lUydIzltI=
github.com/lestrrat-go/iter v1.0.2/go.mod h1:Momfcq3AnRlRjI5b5O8/G5/BvpzrhoFTZcn06fEOPt4=
github.com/lestrrat-go/jwx/v2 v2.1.3 h1:Ud4lb2QuxRClYAmRleF50KrbKIoM1TddXgBrneT5/Jo=
github.com/lestrrat-go/jwx/v2 v2.1.3/go.mod h1:q6uFgbgZfEmQrfJfrCo90QcQOcXFMfbI/fO0NqRtvZo=
github.com/lestrrat-go/option v1.0.1 h1:oAzP2fvZGQKWkvHa1/SAcFolBEca1oN+mQ7eooNBEYU=
github.com/lestrrat-go/option v1.0.1/go.mod h1:5ZHFbivi4xwXxhxY9XHDe2FHo6/Z7WWmtT7T5nBBp3I=
github.com/libp2p/go-buffer-pool v0.1.0 h1:oK4mSFcQz7cTQIfqbe4MIj9gLW+mnanjyFtc6cdF0Y8=
github.com/libp2p/go-buffer-pool v0.1.0/go.mod h1:N+vh8gMqimBzdKkSMVuydVDq+UV5QTWy5HSiZacSbPg=
github.com/libp2p/go-cidranger v1.1.0 h1:ewPN8EZ0dd1LSnrtuwd4709PXVcITVeuwbag38yPW7c=
github.com/libp2p/go-cidranger v1.1.0/go.mod h1:KWZTfSr+r9qEo9OkI9/SIEeAtw+NNoU0dXIXt15Okic=
github.com/libp2p/go-libp2p v0.25.1 h1:YK+YDCHpYyTvitKWVxa5PfElgIpOONU01X5UcLEwJGA=
github.com/libp2p/go-libp2p v0.25.1/go.mod h1:xnK9/1d9+jeQCVvi/f1g12KqtVi/jP/SijtKV1hML3g=
github.com/libp2p/go-libp2p-asn-util v0.2.0 h1:rg3+Os8jbnO5DxkC7K/Utdi+DkY3q/d1/1q+8WeNAsw=
github.com/libp2p/go-libp2p-asn-util v0.2.0/go.mod h1:WoaWxbHKBymSN41hWSq/lGKJEca7TNm58+gGJi2WsLI=
github.com/libp2p/go-libp2p-record v0.2.0 h1:oiNUOCWno2BFuxt3my4i1frNrt7PerzB3queqa1NkQ0=
github.com/libp2p/go-libp2p-record v0.2.0/go.mod h1:I+3zMkvvg5m2OcSdoL0KPljyJyvNDFGKX7QdlpYUcwk=
github.com/libp2p/go-libp2p-testing v0.12.0 h1:EPvBb4kKMWO29qP4mZGyhVzUyR25dvfUIK5WDu6iPUA=
github.com/libp2p/go-libp2p-testing v0.12.0/go.mod h1:KcGDRXyN7sQCllucn1cOOS+Dmm7ujhfEyXQL5lvkcPg=
github.com/libp2p/go-msgio v0.3.0 h1:mf3Z8B1xcFN314sWX+2vOTShIE0Mmn2TXn3YCUQGNj0=
github.com/libp2p/go-msgio v0.3.0/go.mod h1:nyRM819GmVaF9LX3l03RMh10QdOroF++NBbxAb0mmDM=
github.com/libp2p/go-nat v0.1.0 h1:MfVsH6DLcpa04Xr+p8hmVRG4juse0s3J8HyNWYHffXg=
github.com/libp2p/go-nat v0.1.0/go.mod h1:X7teVkwRHNInVNWQiO/tAiAVRwSr5zoRz4YSTC3uRBM=
github.com/libp2p/go-netroute v0.2.1 h1:V8kVrpD8GK0Riv15/7VN6RbUQ3URNZVosw7H2v9tksU=
github.com/libp2p/go-netroute v0.2.1/go.mod h1:hraioZr0fhBjG0ZRXJJ6Zj2IVEVNx6tDTFQfSmcq7mQ=
github.com/mattn/go-colorable v0.1.13 h1:fFA4WZxdEF4tXPZVKMLwD8oUnCTTo08duU7wxecdEvA=
github.com/mattn/go-colorable v0.1.13/go.mod h1:7S9/ev0klgBDR4GtXTXX8a3vIGJpMovkB8vQcUbaXHg=
github.com/mattn/go-encoding v0.0.2 h1:OC1L+QXLJge9n7yIE3R5Os/UNasUeFvK3Sa4NjbDi6c=
github.com/mattn/go-encoding v0.0.2/go.mod h1:WUNsdPQLK4JYRzkn8IAdmYKFYGGJ4/9YPxdPoMumPgY=
github.com/mattn/go-isatty v0.0.14/go.mod h1:7GGIvUiUoEMVVmxf/4nioHXj79iQHKdU27kJ6hsGG94=
github.com/mattn/go-isatty v0.0.16/go.mod h1:kYGgaQfpe5nmfYZH+SKPsOc2e4SrIfOl2e/yFXSvRLM=
github.com/mattn/go-isatty v0.0.20 h1:xfD0iDuEKnDkl03q4limB+vH+GxLEtL/jb4xVJSWWEY=
github.com/mattn/go-isatty v0.0.20/go.mod h1:W+V8PltTTMOvKvAeJH7IuucS94S2C6jfK/D7dTCTo3Y=
github.com/mattn/go-sqlite3 v1.14.24 h1:tpSp2G2KyMnnQu99ngJ47EIkWVmliIizyZBfPrBWDRM=
github.com/mattn/go-sqlite3 v1.14.24/go.mod h1:Uh1q+B4BYcTPb+yiD3kU8Ct7aC0hY9fxUwlHK0RXw+Y=
github.com/miekg/dns v1.1.50 h1:DQUfb9uc6smULcREF09Uc+/Gd46YWqJd5DbpPE9xkcA=
github.com/miekg/dns v1.1.50/go.mod h1:e3IlAVfNqAllflbibAZEWOXOQ+Ynzk/dDozDxY7XnME=
github.com/minio/sha256-simd v1.0.1 h1:6kaan5IFmwTNynnKKpDHe6FWHohJOHhCPchzK49dzMM=
github.com/minio/sha256-simd v1.0.1/go.mod h1:Pz6AKMiUdngCLpeTL/RJY1M9rUuPMYujV5xJjtbRSN8=
github.com/mr-tron/base58 v1.2.0 h1:T/HDJBh4ZCPbU39/+c3rRvE0uKBQlU27+QI8LJ4t64o=
github.com/mr-tron/base58 v1.2.0/go.mod h1:BinMc/sQntlIE1frQmRFPUoPA1Zkr8VRgBdjWI2mNwc=
github.com/multiformats/go-base32 v0.1.0 h1:pVx9xoSPqEIQG8o+UbAe7DNi51oej1NtK+aGkbLYxPE=
github.com/multiformats/go-base32 v0.1.0/go.mod h1:Kj3tFY6zNr+ABYMqeUNeGvkIC/UYgtWibDcT0rExnbI=
github.com/multiformats/go-base36 v0.2.0 h1:lFsAbNOGeKtuKozrtBsAkSVhv1p9D0/qedU9rQyccr0=
github.com/multiformats/go-base36 v0.2.0/go.mod h1:qvnKE++v+2MWCfePClUEjE78Z7P2a1UV0xHgWc0hkp4=
github.com/multiformats/go-multiaddr v0.8.0 h1:aqjksEcqK+iD/Foe1RRFsGZh8+XFiGo7FgUCZlpv3LU=
github.com/multiformats/go-multiaddr v0.8.0/go.mod h1:Fs50eBDWvZu+l3/9S6xAE7ZYj6yhxlvaVZjakWN7xRs=
github.com/multiformats/go-multiaddr-dns v0.3.1 h1:QgQgR+LQVt3NPTjbrLLpsaT2ufAA2y0Mkk+QRVJbW3A=
github.com/multiformats/go-multiaddr-dns v0.3.1/go.mod h1:G/245BRQ6FJGmryJCrOuTdB37AMA5AMOVuO6NY3JwTk=
github.com/multiformats/go-multiaddr-fmt v0.1.0 h1:WLEFClPycPkp4fnIzoFoV9FVd49/eQsuaL3/CWe167E=
github.com/multiformats/go-multiaddr-fmt v0.1.0/go.mod h1:hGtDIW4PU4BqJ50gW2quDuPVjyWNZxToGUh/HwTZYJo=
github.com/multiformats/go-multibase v0.2.0 h1:isdYCVLvksgWlMW9OZRYJEa9pZETFivncJHmHnnd87g=
github.com/multiformats/go-multibase v0.2.0/go.mod h1:bFBZX4lKCA/2lyOFSAoKH5SS6oPyjtnzK/XTFDPkNuk=
github.com/multiformats/go-multicodec v0.9.0 h1:pb/dlPnzee/Sxv/j4PmkDRxCOi3hXTz3IbPKOXWJkmg=
github.com/multiformats/go-multicodec v0.9.0/go.mod h1:L3QTQvMIaVBkXOXXtVmYE+LI16i14xuaojr/H7Ai54k=
github.com/multiformats/go-multihash v0.2.3 h1:7Lyc8XfX/IY2jWb/gI7JP+o7JEq9hOa7BFvVU9RSh+U=
github.com/multiformats/go-multihash v0.2.3/go.mod h1:dXgKXCXjBzdscBLk9JkjINiEsCKRVch90MdaGiKsvSM=
github.com/multiformats/go-multistream v0.4.1 h1:rFy0Iiyn3YT0asivDUIR05leAdwZq3de4741sbiSdfo=
github.com/multiformats/go-multistream v0.4.1/go.mod h1:Mz5eykRVAjJWckE2U78c6xqdtyNUEhKSM0Lwar2p77Q=
github.com/multiformats/go-varint v0.0.7 h1:sWSGR+f/eu5ABZA2ZpYKBILXTTs9JWpdEM/nEGOHFS8=
github.com/multiformats/go-varint v0.0.7/go.mod h1:r8PUYw/fD/SjBCiKOoDlGF6QawOELpZAu9eioSos/OU=
github.com/munnerz/goautoneg v0.0.0-20191010083416-a7dc8b61c822 h1:C3w9PqII01/Oq1c1nUAm88MOHcQC9l5mIlSMApZMrHA=
github.com/munnerz/goautoneg v0.0.0-20191010083416-a7dc8b61c822/go.mod h1:+n7T8mK8HuQTcFwEeznm/DIxMOiR9yIdICNftLE1DvQ=
github.com/opentracing/opentracing-go v1.2.0 h1:uEJPy/1a5RIPAJ0Ov+OIO8OxWu77jEv+1B0VhjKrZUs=
github.com/opentracing/opentracing-go v1.2.0/go.mod h1:GxEUsuufX4nBwe+T+Wl9TAgYrxe9dPLANfrWvHYVTgc=
github.com/orandin/slog-gorm v1.4.0 h1:FgA8hJufF9/jeNSYoEXmHPPBwET2gwlF3B85JdpsTUU=
github.com/orandin/slog-gorm v1.4.0/go.mod h1:MoZ51+b7xE9lwGNPYEhxcUtRNrYzjdcKvA8QXQQGEPA=
github.com/petar/GoLLRB v0.0.0-20210522233825-ae3b015fd3e9 h1:1/WtZae0yGtPq+TI6+Tv1WTxkukpXeMlviSxvL7SRgk=
github.com/petar/GoLLRB v0.0.0-20210522233825-ae3b015fd3e9/go.mod h1:x3N5drFsm2uilKKuuYo6LdyD8vZAW55sH/9w+pbo1sw=
github.com/pingcap/errors v0.11.4 h1:lFuQV/oaUMGcD2tqt+01ROSmJs75VG1ToEOkZIZ4nE4=
github.com/pingcap/errors v0.11.4/go.mod h1:Oi8TUi2kEtXXLMJk9l1cGmz20kV3TaQ0usTwv5KuLY8=
github.com/pkg/diff v0.0.0-20210226163009-20ebb0f2a09e/go.mod h1:pJLUxLENpZxwdsKMEsNbx1VGcRFpLqf3715MtcvvzbA=
github.com/pkg/errors v0.8.1/go.mod h1:bwawxfHBFNV+L2hUp1rHADufV3IMtnDRdf1r5NINEl0=
github.com/pkg/errors v0.9.1 h1:FEBLx1zS214owpjy7qsBeixbURkuhQAwrK5UwLGTwt4=
github.com/pkg/errors v0.9.1/go.mod h1:bwawxfHBFNV+L2hUp1rHADufV3IMtnDRdf1r5NINEl0=
github.com/pmezard/go-difflib v1.0.0 h1:4DBwDE0NGyQoBHbLQYPwSUPoCMWR5BEzIk/f1lZbAQM=
github.com/pmezard/go-difflib v1.0.0/go.mod h1:iKH77koFhYxTK1pcRnkKkqfTogsbg7gZNVY4sRDYZ/4=
github.com/polydawn/refmt v0.89.1-0.20221221234430-40501e09de1f h1:VXTQfuJj9vKR4TCkEuWIckKvdHFeJH/huIFJ9/cXOB0=
github.com/polydawn/refmt v0.89.1-0.20221221234430-40501e09de1f/go.mod h1:/zvteZs/GwLtCgZ4BL6CBsk9IKIlexP43ObX9AxTqTw=
github.com/prometheus/client_golang v1.20.5 h1:cxppBPuYhUnsO6yo/aoRol4L7q7UFfdm+bR9r+8l63Y=
github.com/prometheus/client_golang v1.20.5/go.mod h1:PIEt8X02hGcP8JWbeHyeZ53Y/jReSnHgO035n//V5WE=
github.com/prometheus/client_model v0.6.1 h1:ZKSh/rekM+n3CeS952MLRAdFwIKqeY8b62p8ais2e9E=
github.com/prometheus/client_model v0.6.1/go.mod h1:OrxVMOVHjw3lKMa8+x6HeMGkHMQyHDk9E3jmP2AmGiY=
github.com/prometheus/common v0.61.0 h1:3gv/GThfX0cV2lpO7gkTUwZru38mxevy90Bj8YFSRQQ=
github.com/prometheus/common v0.61.0/go.mod h1:zr29OCN/2BsJRaFwG8QOBr41D6kkchKbpeNH7pAjb/s=
github.com/prometheus/procfs v0.15.1 h1:YagwOFzUgYfKKHX6Dr+sHT7km/hxC76UB0learggepc=
github.com/prometheus/procfs v0.15.1/go.mod h1:fB45yRUv8NstnjriLhBQLuOUt+WW4BsoGhij/e3PBqk=
github.com/rogpeppe/go-internal v1.3.0/go.mod h1:M8bDsm7K2OlrFYOpmOWEs/qY81heoFRclV5y23lUDJ4=
github.com/rogpeppe/go-internal v1.9.0/go.mod h1:WtVeX8xhTBvf0smdhujwtBcq4Qrzq/fJaraNFVN+nFs=
github.com/rogpeppe/go-internal v1.13.1 h1:KvO1DLK/DRN07sQ1LQKScxyZJuNnedQ5/wKSR38lUII=
github.com/rogpeppe/go-internal v1.13.1/go.mod h1:uMEvuHeurkdAXX61udpOXGD/AzZDWNMNyH2VO9fmH0o=
github.com/russross/blackfriday/v2 v2.0.1/go.mod h1:+Rmxgy9KzJVeS9/2gXHxylqXiyQDYRxCVz55jmeOWTM=
github.com/russross/blackfriday/v2 v2.1.0 h1:JIOH55/0cWyOuilr9/qlrm0BSXldqnqwMsf35Ld67mk=
github.com/russross/blackfriday/v2 v2.1.0/go.mod h1:+Rmxgy9KzJVeS9/2gXHxylqXiyQDYRxCVz55jmeOWTM=
github.com/segmentio/asm v1.2.0 h1:9BQrFxC+YOHJlTlHGkTrFWf59nbL3XnCoFLTwDCI7ys=
github.com/segmentio/asm v1.2.0/go.mod h1:BqMnlJP91P8d+4ibuonYZw9mfnzI9HfxselHZr5aAcs=
github.com/shurcooL/sanitized_anchor_name v1.0.0/go.mod h1:1NzhyTcUVG4SuEtjjoZeVRXNmyL/1OwPU0+IJeTBvfc=
github.com/smartystreets/assertions v1.2.0 h1:42S6lae5dvLc7BrLu/0ugRtcFVjoJNMC/N3yZFZkDFs=
github.com/smartystreets/assertions v1.2.0/go.mod h1:tcbTF8ujkAEcZ8TElKY+i30BzYlVhC/LOxJk7iOWnoo=
github.com/smartystreets/goconvey v1.7.2 h1:9RBaZCeXEQ3UselpuwUQHltGVXvdwm6cv1hgR6gDIPg=
github.com/smartystreets/goconvey v1.7.2/go.mod h1:Vw0tHAZW6lzCRk3xgdin6fKYcG+G3Pg9vgXWeJpQFMM=
github.com/spaolacci/murmur3 v1.1.0 h1:7c1g84S4BPRrfL5Xrdp6fOJ206sU9y293DDHaoy0bLI=
github.com/spaolacci/murmur3 v1.1.0/go.mod h1:JwIasOWyU6f++ZhiEuf87xNszmSA2myDM2Kzu9HwQUA=
github.com/stretchr/objx v0.1.0/go.mod h1:HFkY916IF+rwdDfMAkV7OtwuqBVzrE8GR6GFx+wExME=
github.com/stretchr/testify v1.3.0/go.mod h1:M5WIy9Dh21IEIfnGCwXGc5bZfKNJtfHm1UVUgZn+9EI=
github.com/stretchr/testify v1.4.0/go.mod h1:j7eGeouHqKxXV5pUuKE4zz7dFj8WfuZ+81PSLYec5m4=
github.com/stretchr/testify v1.6.1/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/stretchr/testify v1.7.0/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/stretchr/testify v1.7.1/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/stretchr/testify v1.10.0 h1:Xv5erBjTwe/5IxqUQTdXv5kgmIvbHo3QQyRwhJsOfJA=
github.com/stretchr/testify v1.10.0/go.mod h1:r2ic/lqez/lEtzL7wO/rwa5dbSLXVDPFyf8C91i36aY=
github.com/urfave/cli v1.22.10/go.mod h1:Gos4lmkARVdJ6EkW0WaNv/tZAAMe9V7XWyB60NtXRu0=
github.com/urfave/cli/v2 v2.27.5 h1:WoHEJLdsXr6dDWoJgMq/CboDmyY/8HMMH1fTECbih+w=
github.com/urfave/cli/v2 v2.27.5/go.mod h1:3Sevf16NykTbInEnD0yKkjDAeZDS0A6bzhBH5hrMvTQ=
github.com/warpfork/go-testmark v0.12.1 h1:rMgCpJfwy1sJ50x0M0NgyphxYYPMOODIJHhsXyEHU0s=
github.com/warpfork/go-testmark v0.12.1/go.mod h1:kHwy7wfvGSPh1rQJYKayD4AbtNaeyZdcGi9tNJTaa5Y=
github.com/warpfork/go-wish v0.0.0-20220906213052-39a1cc7a02d0 h1:GDDkbFiaK8jsSDJfjId/PEGEShv6ugrt4kYsC5UIDaQ=
github.com/warpfork/go-wish v0.0.0-20220906213052-39a1cc7a02d0/go.mod h1:x6AKhvSSexNrVSrViXSHUEbICjmGXhtgABaHIySUSGw=
github.com/whyrusleeping/cbor v0.0.0-20171005072247-63513f603b11 h1:5HZfQkwe0mIfyDmc1Em5GqlNRzcdtlv4HTNmdpt7XH0=
github.com/whyrusleeping/cbor v0.0.0-20171005072247-63513f603b11/go.mod h1:Wlo/SzPmxVp6vXpGt/zaXhHH0fn4IxgqZc82aKg6bpQ=
github.com/whyrusleeping/cbor-gen v0.2.1-0.20241030202151-b7a6831be65e h1:28X54ciEwwUxyHn9yrZfl5ojgF4CBNLWX7LR0rvBkf4=
github.com/whyrusleeping/cbor-gen v0.2.1-0.20241030202151-b7a6831be65e/go.mod h1:pM99HXyEbSQHcosHc0iW7YFmwnscr+t9Te4ibko05so=
github.com/whyrusleeping/chunker v0.0.0-20181014151217-fe64bd25879f h1:jQa4QT2UP9WYv2nzyawpKMOCl+Z/jW7djv2/J50lj9E=
github.com/whyrusleeping/chunker v0.0.0-20181014151217-fe64bd25879f/go.mod h1:p9UJB6dDgdPgMJZs7UjUOdulKyRr9fqkS+6JKAInPy8=
github.com/whyrusleeping/go-did v0.0.0-20240828165449-bcaa7ae21371 h1:W4jEGWdes35iuiiAYNZFOjx+dwzQOBh33kVpc0C0YiE=
github.com/whyrusleeping/go-did v0.0.0-20240828165449-bcaa7ae21371/go.mod h1:39U9RRVr4CKbXpXYopWn+FSH5s+vWu6+RmguSPWAq5s=
github.com/xrash/smetrics v0.0.0-20240521201337-686a1a2994c1 h1:gEOO8jv9F4OT7lGCjxCBTO/36wtF6j2nSip77qHd4x4=
github.com/xrash/smetrics v0.0.0-20240521201337-686a1a2994c1/go.mod h1:Ohn+xnUBiLI6FVj/9LpzZWtj1/D6lUovWYBkxHVV3aM=
github.com/yuin/goldmark v1.1.27/go.mod h1:3hX8gzYuyVAZsxl0MRgGTJEmQBFcNTphYh9decYSb74=
github.com/yuin/goldmark v1.2.1/go.mod h1:3hX8gzYuyVAZsxl0MRgGTJEmQBFcNTphYh9decYSb74=
github.com/yuin/goldmark v1.3.5/go.mod h1:mwnBkeHKe2W/ZEtQ+71ViKU8L12m81fl3OWwC1Zlc8k=
github.com/yuin/goldmark v1.4.13/go.mod h1:6yULJ656Px+3vBD8DxQVa3kxgyrAnzto9xy5taEt/CY=
gitlab.com/yawning/secp256k1-voi v0.0.0-20230925100816-f2616030848b h1:CzigHMRySiX3drau9C6Q5CAbNIApmLdat5jPMqChvDA=
gitlab.com/yawning/secp256k1-voi v0.0.0-20230925100816-f2616030848b/go.mod h1:/y/V339mxv2sZmYYR64O07VuCpdNZqCTwO8ZcouTMI8=
gitlab.com/yawning/tuplehash v0.0.0-20230713102510-df83abbf9a02 h1:qwDnMxjkyLmAFgcfgTnfJrmYKWhHnci3GjDqcZp1M3Q=
gitlab.com/yawning/tuplehash v0.0.0-20230713102510-df83abbf9a02/go.mod h1:JTnUj0mpYiAsuZLmKjTx/ex3AtMowcCgnE7YNyCEP0I=
go.opentelemetry.io/auto/sdk v1.1.0 h1:cH53jehLUN6UFLY71z+NDOiNJqDdPRaXzTel0sJySYA=
go.opentelemetry.io/auto/sdk v1.1.0/go.mod h1:3wSPjt5PWp2RhlCcmmOial7AvC4DQqZb7a7wCow3W8A=
go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp v0.58.0 h1:yd02MEjBdJkG3uabWP9apV+OuWRIXGDuJEUJbOHmCFU=
go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp v0.58.0/go.mod h1:umTcuxiv1n/s/S6/c2AT/g2CQ7u5C59sHDNmfSwgz7Q=
go.opentelemetry.io/otel v1.33.0 h1:/FerN9bax5LoK51X/sI0SVYrjSE0/yUL7DpxW4K3FWw=
go.opentelemetry.io/otel v1.33.0/go.mod h1:SUUkR6csvUQl+yjReHu5uM3EtVV7MBm5FHKRlNx4I8I=
go.opentelemetry.io/otel/metric v1.33.0 h1:r+JOocAyeRVXD8lZpjdQjzMadVZp2M4WmQ+5WtEnklQ=
go.opentelemetry.io/otel/metric v1.33.0/go.mod h1:L9+Fyctbp6HFTddIxClbQkjtubW6O9QS3Ann/M82u6M=
go.opentelemetry.io/otel/trace v1.33.0 h1:cCJuF7LRjUFso9LPnEAHJDB2pqzp+hbO8eu1qqW2d/s=
go.opentelemetry.io/otel/trace v1.33.0/go.mod h1:uIcdVUZMpTAmz0tI1z04GoVSezK37CbGV4fr1f2nBck=
go.uber.org/atomic v1.6.0/go.mod h1:sABNBOSYdrvTF6hTgEIbc7YasKWGhgEQZyfxyTvoXHQ=
go.uber.org/atomic v1.7.0/go.mod h1:fEN4uk6kAWBTFdckzkM89CLk9XfWZrxpCo0nPH17wJc=
go.uber.org/atomic v1.11.0 h1:ZvwS0R+56ePWxUNi+Atn9dWONBPp/AUETXlHW0DxSjE=
go.uber.org/atomic v1.11.0/go.mod h1:LUxbIzbOniOlMKjJjyPfpl4v+PKK2cNJn91OQbhoJI0=
go.uber.org/goleak v1.1.11-0.20210813005559-691160354723/go.mod h1:cwTWslyiVhfpKIDGSZEM2HlOvcqm+tG4zioyIeLoqMQ=
go.uber.org/goleak v1.3.0 h1:2K3zAYmnTNqV73imy9J1T3WC+gmCePx2hEGkimedGto=
go.uber.org/goleak v1.3.0/go.mod h1:CoHD4mav9JJNrW/WLlf7HGZPjdw8EucARQHekz1X6bE=
go.uber.org/multierr v1.5.0/go.mod h1:FeouvMocqHpRaaGuG9EjoKcStLC43Zu/fmqdUMPcKYU=
go.uber.org/multierr v1.6.0/go.mod h1:cdWPpRnG4AhwMwsgIHip0KRBQjJy5kYEpYjJxpXp9iU=
go.uber.org/multierr v1.11.0 h1:blXXJkSxSSfBVBlC76pxqeO+LN3aDfLQo+309xJstO0=
go.uber.org/multierr v1.11.0/go.mod h1:20+QtiLqy0Nd6FdQB9TLXag12DsQkrbs3htMFfDN80Y=
go.uber.org/tools v0.0.0-20190618225709-2cfd321de3ee/go.mod h1:vJERXedbb3MVM5f9Ejo0C68/HhF8uaILCdgjnY+goOA=
go.uber.org/zap v1.16.0/go.mod h1:MA8QOfq0BHJwdXa996Y4dYkAqRKB8/1K1QMMZVaNZjQ=
go.uber.org/zap v1.19.1/go.mod h1:j3DNczoxDZroyBnOT1L/Q79cfUMGZxlv/9dzN7SM1rI=
go.uber.org/zap v1.27.0 h1:aJMhYGrd5QSmlpLMr2MftRKl7t8J8PTZPA732ud/XR8=
go.uber.org/zap v1.27.0/go.mod h1:GB2qFLM7cTU87MWRP2mPIjqfIDnGu+VIO4V/SdhGo2E=
golang.org/x/crypto v0.0.0-20190308221718-c2843e01d9a2/go.mod h1:djNgcEr1/C05ACkg1iLfiJU5Ep61QUkGW8qpdssI0+w=
golang.org/x/crypto v0.0.0-20190510104115-cbcb75029529/go.mod h1:yigFU9vqHzYiE8UmvKecakEJjdnWj3jj499lnFckfCI=
golang.org/x/crypto v0.0.0-20191011191535-87dc89f01550/go.mod h1:yigFU9vqHzYiE8UmvKecakEJjdnWj3jj499lnFckfCI=
golang.org/x/crypto v0.0.0-20200622213623-75b288015ac9/go.mod h1:LzIPMQfyMNhhGPhUkYOs5KpL4U8rLKemX1yGLhDgUto=
golang.org/x/crypto v0.0.0-20210921155107-089bfa567519/go.mod h1:GvvjBRRGRdwPK5ydBHafDWAxML/pGHZbMvKqRZ5+Abc=
golang.org/x/crypto v0.13.0/go.mod h1:y6Z2r+Rw4iayiXXAIxJIDAJ1zMW4yaTpebo8fPOliYc=
golang.org/x/crypto v0.19.0/go.mod h1:Iy9bg/ha4yyC70EfRS8jz+B6ybOBKMaSxLj6P6oBDfU=
golang.org/x/crypto v0.23.0/go.mod h1:CKFgDieR+mRhux2Lsu27y0fO304Db0wZe70UKqHu0v8=
golang.org/x/crypto v0.31.0/go.mod h1:kDsLvtWBEx7MV9tJOj9bnXsPbxwJQ6csT/x4KIN4Ssk=
golang.org/x/crypto v0.32.0 h1:euUpcYgM8WcP71gNpTqQCn6rC2t6ULUPiOzfWaXVVfc=
golang.org/x/crypto v0.32.0/go.mod h1:ZnnJkOaASj8g0AjIduWNlq2NRxL0PlBrbKVyZ6V/Ugc=
golang.org/x/exp v0.0.0-20250106191152-7588d65b2ba8 h1:yqrTHse8TCMW1M1ZCP+VAR/l0kKxwaAIqN/il7x4voA=
golang.org/x/exp v0.0.0-20250106191152-7588d65b2ba8/go.mod h1:tujkw807nyEEAamNbDrEGzRav+ilXA7PCRAd6xsmwiU=
golang.org/x/lint v0.0.0-20190930215403-16217165b5de/go.mod h1:6SW0HCj/g11FgYtHlgUYUwCkIfeOF89ocIRzGO/8vkc=
golang.org/x/mod v0.0.0-20190513183733-4bf6d317e70e/go.mod h1:mXi4GBBbnImb6dmsKGUJ2LatrhH/nqhxcFungHvyanc=
golang.org/x/mod v0.2.0/go.mod h1:s0Qsj1ACt9ePp/hMypM3fl4fZqREWJwdYDEqhRiZZUA=
golang.org/x/mod v0.3.0/go.mod h1:s0Qsj1ACt9ePp/hMypM3fl4fZqREWJwdYDEqhRiZZUA=
golang.org/x/mod v0.4.2/go.mod h1:s0Qsj1ACt9ePp/hMypM3fl4fZqREWJwdYDEqhRiZZUA=
golang.org/x/mod v0.6.0-dev.0.20220419223038-86c51ed26bb4/go.mod h1:jJ57K6gSWd91VN4djpZkiMVwK6gcyfeH4XE8wZrZaV4=
golang.org/x/mod v0.8.0/go.mod h1:iBbtSCu2XBx23ZKBPSOrRkjjQPZFPuis4dIYUhu/chs=
golang.org/x/mod v0.12.0/go.mod h1:iBbtSCu2XBx23ZKBPSOrRkjjQPZFPuis4dIYUhu/chs=
golang.org/x/mod v0.15.0/go.mod h1:hTbmBsO62+eylJbnUtE2MGJUyE7QWk4xUqPFrRgJ+7c=
golang.org/x/mod v0.17.0/go.mod h1:hTbmBsO62+eylJbnUtE2MGJUyE7QWk4xUqPFrRgJ+7c=
golang.org/x/mod v0.22.0 h1:D4nJWe9zXqHOmWqj4VMOJhvzj7bEZg4wEYa759z1pH4=
golang.org/x/mod v0.22.0/go.mod h1:6SkKJ3Xj0I0BrPOZoBy3bdMptDDU9oJrpohJ3eWZ1fY=
golang.org/x/net v0.0.0-20190311183353-d8887717615a/go.mod h1:t9HGtf8HONx5eT2rtn7q6eTqICYqUVnKs3thJo3Qplg=
golang.org/x/net v0.0.0-20190404232315-eb5bcb51f2a3/go.mod h1:t9HGtf8HONx5eT2rtn7q6eTqICYqUVnKs3thJo3Qplg=
golang.org/x/net v0.0.0-20190620200207-3b0461eec859/go.mod h1:z5CRVTTTmAJ677TzLLGU+0bjPO0LkuOLi4/5GtJWs/s=
golang.org/x/net v0.0.0-20200226121028-0de0cce0169b/go.mod h1:z5CRVTTTmAJ677TzLLGU+0bjPO0LkuOLi4/5GtJWs/s=
golang.org/x/net v0.0.0-20201021035429-f5854403a974/go.mod h1:sp8m0HH+o8qH0wwXwYZr8TS3Oi6o0r6Gce1SSxlDquU=
golang.org/x/net v0.0.0-20210226172049-e18ecbb05110/go.mod h1:m0MpNAwzfU5UDzcl9v0D8zg8gWTRqZa9RBIspLL5mdg=
golang.org/x/net v0.0.0-20210405180319-a5a99cb37ef4/go.mod h1:p54w0d4576C0XHj96bSt6lcn1PtDYWL6XObtHCRCNQM=
golang.org/x/net v0.0.0-20220722155237-a158d28d115b/go.mod h1:XRhObCWvk6IyKnWLug+ECip1KBveYUHfp+8e9klMJ9c=
golang.org/x/net v0.6.0/go.mod h1:2Tu9+aMcznHK/AK1HMvgo6xiTLG5rD5rZLDS+rp2Bjs=
golang.org/x/net v0.10.0/go.mod h1:0qNGK6F8kojg2nk9dLZ2mShWaEBan6FAoqfSigmmuDg=
golang.org/x/net v0.15.0/go.mod h1:idbUs1IY1+zTqbi8yxTbhexhEEk5ur9LInksu6HrEpk=
golang.org/x/net v0.21.0/go.mod h1:bIjVDfnllIU7BJ2DNgfnXvpSvtn8VRwhlsaeUTyUS44=
golang.org/x/net v0.25.0/go.mod h1:JkAGAh7GEvH74S6FOH42FLoXpXbE/aqXSrIQjXgsiwM=
golang.org/x/net v0.33.0/go.mod h1:HXLR5J+9DxmrqMwG9qjGCxZ+zKXxBru04zlTvWlWuN4=
golang.org/x/net v0.34.0 h1:Mb7Mrk043xzHgnRM88suvJFwzVrRfHEHJEl5/71CKw0=
golang.org/x/net v0.34.0/go.mod h1:di0qlW3YNM5oh6GqDGQr92MyTozJPmybPK4Ev/Gm31k=
golang.org/x/sync v0.0.0-20190423024810-112230192c58/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.0.0-20190911185100-cd5d95a43a6e/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.0.0-20201020160332-67f06af15bc9/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.0.0-20210220032951-036812b2e83c/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.0.0-20220722155255-886fb9371eb4/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.1.0/go.mod h1:RxMgew5VJxzue5/jJTE5uejpjVlOe/izrB70Jof72aM=
golang.org/x/sync v0.3.0/go.mod h1:FU7BRWz2tNW+3quACPkgCx/L+uEAv1htQ0V83Z9Rj+Y=
golang.org/x/sync v0.6.0/go.mod h1:Czt+wKu1gCyEFDUtn0jG5QVvpJ6rzVqr5aXyt9drQfk=
golang.org/x/sync v0.7.0/go.mod h1:Czt+wKu1gCyEFDUtn0jG5QVvpJ6rzVqr5aXyt9drQfk=
golang.org/x/sync v0.10.0 h1:3NQrjDixjgGwUOCaF8w2+VYHv0Ve/vGYSbdkTa98gmQ=
golang.org/x/sync v0.10.0/go.mod h1:Czt+wKu1gCyEFDUtn0jG5QVvpJ6rzVqr5aXyt9drQfk=
golang.org/x/sys v0.0.0-20190215142949-d0b11bdaac8a/go.mod h1:STP8DvDyc/dI5b8T5hshtkjS+E42TnysNCUPdjciGhY=
golang.org/x/sys v0.0.0-20190412213103-97732733099d/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20200930185726-fdedc70b468f/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20201119102817-f84b799fce68/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20210330210617-4fbd30eecc44/go.mod h1:h1NjWce9XRLGQEsW7wpKNCjG9DtNlClVuFLEZdDNbEs=
golang.org/x/sys v0.0.0-20210510120138-977fb7262007/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.0.0-20210615035016-665e8c7367d1/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.0.0-20210630005230-0f9fa26af87c/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.0.0-20220520151302-bc2c85ada10a/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.0.0-20220722155257-8c9f86f7a55f/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.0.0-20220811171246-fbc7d0a398ab/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.5.0/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.6.0/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.8.0/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.12.0/go.mod h1:oPkhp1MJrh7nUepCBck5+mAzfO9JrbApNNgaTdGDITg=
golang.org/x/sys v0.17.0/go.mod h1:/VUhepiaJMQUp4+oa/7Zr1D23ma6VTLIYjOOTFZPUcA=
golang.org/x/sys v0.20.0/go.mod h1:/VUhepiaJMQUp4+oa/7Zr1D23ma6VTLIYjOOTFZPUcA=
golang.org/x/sys v0.28.0/go.mod h1:/VUhepiaJMQUp4+oa/7Zr1D23ma6VTLIYjOOTFZPUcA=
golang.org/x/sys v0.29.0 h1:TPYlXGxvx1MGTn2GiZDhnjPA9wZzZeGKHHmKhHYvgaU=
golang.org/x/sys v0.29.0/go.mod h1:/VUhepiaJMQUp4+oa/7Zr1D23ma6VTLIYjOOTFZPUcA=
golang.org/x/telemetry v0.0.0-20240228155512-f48c80bd79b2/go.mod h1:TeRTkGYfJXctD9OcfyVLyj2J3IxLnKwHJR8f4D8a3YE=
golang.org/x/term v0.0.0-20201126162022-7de9c90e9dd1/go.mod h1:bj7SfCRtBDWHUb9snDiAeCFNEtKQo2Wmx5Cou7ajbmo=
golang.org/x/term v0.0.0-20210927222741-03fcf44c2211/go.mod h1:jbD1KX2456YbFQfuXm/mYQcufACuNUgVhRMnK/tPxf8=
golang.org/x/term v0.5.0/go.mod h1:jMB1sMXY+tzblOD4FWmEbocvup2/aLOaQEp7JmGp78k=
golang.org/x/term v0.8.0/go.mod h1:xPskH00ivmX89bAKVGSKKtLOWNx2+17Eiy94tnKShWo=
golang.org/x/term v0.12.0/go.mod h1:owVbMEjm3cBLCHdkQu9b1opXd4ETQWc3BhuQGKgXgvU=
golang.org/x/term v0.17.0/go.mod h1:lLRBjIVuehSbZlaOtGMbcMncT+aqLLLmKrsjNrUguwk=
golang.org/x/term v0.20.0/go.mod h1:8UkIAJTvZgivsXaD6/pH6U9ecQzZ45awqEOzuCvwpFY=
golang.org/x/term v0.27.0/go.mod h1:iMsnZpn0cago0GOrHO2+Y7u7JPn5AylBrcoWkElMTSM=
golang.org/x/text v0.3.0/go.mod h1:NqM8EUOU14njkJ3fqMW+pc6Ldnwhi/IjpwHt7yyuwOQ=
golang.org/x/text v0.3.3/go.mod h1:5Zoc/QRtKVWzQhOtBMvqHzDpF6irO9z98xDceosuGiQ=
golang.org/x/text v0.3.7/go.mod h1:u+2+/6zg+i71rQMx5EYifcz6MCKuco9NR6JIITiCfzQ=
golang.org/x/text v0.7.0/go.mod h1:mrYo+phRRbMaCq/xk9113O4dZlRixOauAjOtrjsXDZ8=
golang.org/x/text v0.9.0/go.mod h1:e1OnstbJyHTd6l/uOt8jFFHp6TRDWZR/bV3emEE/zU8=
golang.org/x/text v0.13.0/go.mod h1:TvPlkZtksWOMsz7fbANvkp4WM8x/WCo/om8BMLbz+aE=
golang.org/x/text v0.14.0/go.mod h1:18ZOQIKpY8NJVqYksKHtTdi31H5itFRjB5/qKTNYzSU=
golang.org/x/text v0.15.0/go.mod h1:18ZOQIKpY8NJVqYksKHtTdi31H5itFRjB5/qKTNYzSU=
golang.org/x/text v0.21.0 h1:zyQAAkrwaneQ066sspRyJaG9VNi/YJ1NfzcGB3hZ/qo=
golang.org/x/text v0.21.0/go.mod h1:4IBbMaMmOPCJ8SecivzSH54+73PCFmPWxNTLm+vZkEQ=
golang.org/x/tools v0.0.0-20180917221912-90fa682c2a6e/go.mod h1:n7NCudcB/nEzxVGmLbDWY5pfWTLqBcC2KZ6jyYvM4mQ=
golang.org/x/tools v0.0.0-20190311212946-11955173bddd/go.mod h1:LCzVGOaR6xXOjkQ3onu1FJEFr0SW1gC7cKk1uF8kGRs=
golang.org/x/tools v0.0.0-20190328211700-ab21143f2384/go.mod h1:LCzVGOaR6xXOjkQ3onu1FJEFr0SW1gC7cKk1uF8kGRs=
golang.org/x/tools v0.0.0-20190621195816-6e04913cbbac/go.mod h1:/rFqwRUd4F7ZHNgwSSTFct+R/Kf4OFW1sUzUTQQTgfc=
golang.org/x/tools v0.0.0-20191029041327-9cc4af7d6b2c/go.mod h1:b+2E5dAYhXwXZwtnZ6UAqBI28+e2cm9otk0dWdXHAEo=
golang.org/x/tools v0.0.0-20191029190741-b9c20aec41a5/go.mod h1:b+2E5dAYhXwXZwtnZ6UAqBI28+e2cm9otk0dWdXHAEo=
golang.org/x/tools v0.0.0-20191119224855-298f0cb1881e/go.mod h1:b+2E5dAYhXwXZwtnZ6UAqBI28+e2cm9otk0dWdXHAEo=
golang.org/x/tools v0.0.0-20200619180055-7c47624df98f/go.mod h1:EkVYQZoAsY45+roYkvgYkIh4xh/qjgUK9TdY2XT94GE=
golang.org/x/tools v0.0.0-20210106214847-113979e3529a/go.mod h1:emZCQorbCU4vsT4fOWvOPXz4eW1wZW4PmDk9uLelYpA=
golang.org/x/tools v0.1.5/go.mod h1:o0xws9oXOQQZyjljx8fwUC0k7L1pTE6eaCbjGeHmOkk=
golang.org/x/tools v0.1.12/go.mod h1:hNGJHUnrk76NpqgfD5Aqm5Crs+Hm0VOH/i9J2+nxYbc=
golang.org/x/tools v0.6.0/go.mod h1:Xwgl3UAJ/d3gWutnCtw505GrjyAbvKui8lOU390QaIU=
golang.org/x/tools v0.13.0/go.mod h1:HvlwmtVNQAhOuCjW7xxvovg8wbNq7LwfXh/k7wXUl58=
golang.org/x/tools v0.21.1-0.20240508182429-e35e4ccd0d2d/go.mod h1:aiJjzUbINMkxbQROHiO6hDPo2LHcIPhhQsa9DLh0yGk=
golang.org/x/tools v0.29.0 h1:Xx0h3TtM9rzQpQuR4dKLrdglAmCEN5Oi+P74JdhdzXE=
golang.org/x/tools v0.29.0/go.mod h1:KMQVMRsVxU6nHCFXrBPhDB8XncLNLM0lIy/F14RP588=
golang.org/x/xerrors v0.0.0-20190717185122-a985d3407aa7/go.mod h1:I/5z698sn9Ka8TeJc9MKroUUfqBBauWjQqLJ2OPfmY0=
golang.org/x/xerrors v0.0.0-20191011141410-1b5146add898/go.mod h1:I/5z698sn9Ka8TeJc9MKroUUfqBBauWjQqLJ2OPfmY0=
golang.org/x/xerrors v0.0.0-20191204190536-9bdfabe68543/go.mod h1:I/5z698sn9Ka8TeJc9MKroUUfqBBauWjQqLJ2OPfmY0=
golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1/go.mod h1:I/5z698sn9Ka8TeJc9MKroUUfqBBauWjQqLJ2OPfmY0=
golang.org/x/xerrors v0.0.0-20240903120638-7835f813f4da h1:noIWHXmPHxILtqtCOPIhSt0ABwskkZKjD3bXGnZGpNY=
golang.org/x/xerrors v0.0.0-20240903120638-7835f813f4da/go.mod h1:NDW/Ps6MPRej6fsCIbMTohpP40sJ/P/vI1MoTEGwX90=
google.golang.org/protobuf v1.36.2 h1:R8FeyR1/eLmkutZOM5CWghmo5itiG9z0ktFlTVLuTmU=
google.golang.org/protobuf v1.36.2/go.mod h1:9fA7Ob0pmnwhb644+1+CVWFRbNajQ6iRojtC/QF5bRE=
gopkg.in/check.v1 v0.0.0-20161208181325-20d25e280405/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/check.v1 v1.0.0-20180628173108-788fd7840127/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c h1:Hei/4ADfdWqJk1ZMxUNpqntNwaWcugrBjAiHlqqRiVk=
gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c/go.mod h1:JHkPIbrfpd72SG/EVd6muEfDQjcINNoR0C8j2r3qZ4Q=
gopkg.in/errgo.v2 v2.1.0/go.mod h1:hNsd1EY+bozCKY1Ytp96fpM3vjJbqLJn88ws8XvfDNI=
gopkg.in/yaml.v2 v2.2.2/go.mod h1:hI93XBmqTisBFMUTm0b8Fm+jr3Dg1NNxqwp+5A1VGuI=
gopkg.in/yaml.v2 v2.2.8/go.mod h1:hI93XBmqTisBFMUTm0b8Fm+jr3Dg1NNxqwp+5A1VGuI=
gopkg.in/yaml.v2 v2.4.0 h1:D8xgwECY7CYvx+Y2n4sBz93Jn9JRvxdiyyo8CTfuKaY=
gopkg.in/yaml.v2 v2.4.0/go.mod h1:RDklbk79AGWmwhnvt/jBztapEOGDOx6ZbXqjP6csGnQ=
gopkg.in/yaml.v3 v3.0.0-20200313102051-9f266ea9e77c/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
gopkg.in/yaml.v3 v3.0.0-20210107192922-496545a6307b/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
gopkg.in/yaml.v3 v3.0.1 h1:fxVm/GzAzEWqLHuvctI91KS9hhNmmWOoWu0XTYJS7CA=
gopkg.in/yaml.v3 v3.0.1/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
gorm.io/driver/postgres v1.5.11 h1:ubBVAfbKEUld/twyKZ0IYn9rSQh448EdelLYk9Mv314=
gorm.io/driver/postgres v1.5.11/go.mod h1:DX3GReXH+3FPWGrrgffdvCk3DQ1dwDPdmbenSkweRGI=
gorm.io/driver/sqlite v1.5.7 h1:8NvsrhP0ifM7LX9G4zPB97NwovUakUxc+2V2uuf3Z1I=
gorm.io/driver/sqlite v1.5.7/go.mod h1:U+J8craQU6Fzkcvu8oLeAQmi50TkwPEhHDEjQZXDah4=
gorm.io/gorm v1.25.12 h1:I0u8i2hWQItBq1WfE0o2+WuL9+8L21K9e2HHSTE/0f8=
gorm.io/gorm v1.25.12/go.mod h1:xh7N7RHfYlNc5EmcI/El95gXusucDrQnHXe0+CgWcLQ=
honnef.co/go/tools v0.0.1-2019.2.3/go.mod h1:a3bituU0lyd329TUQxRnasdCoJDkEUEAqEt0JzvZhAg=
lukechampine.com/blake3 v1.3.0 h1:sJ3XhFINmHSrYCgl958hscfIa3bw8x4DqMP3u1YvoYE=
lukechampine.com/blake3 v1.3.0/go.mod h1:0OFRp7fBtAylGVCO40o87sbupkyIGgbpv1+M1k1LM6k=

================================================
FILE: LICENSE
================================================
The MIT License (MIT)

Copyright (c) 2025 Yasuhiro Matsumoto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

================================================
FILE: main.go
================================================
package main

import (
"fmt"
"os"

    "github.com/urfave/cli/v2"

)

const name = "bsky"

const version = "0.0.73"

var revision = "HEAD"

type config struct {
Bgs string `json:"bgs"`
Host string `json:"host"`
Handle string `json:"handle"`
Password string `json:"password"`
dir string
verbose bool
prefix string
}

func main() {
app := &cli.App{
Name: name,
Usage: name,
Version: version,
Description: "A cli application for bluesky",
EnableBashCompletion: true,
Flags: []cli.Flag{
&cli.StringFlag{Name: "a", Usage: "profile name"},
&cli.BoolFlag{Name: "V", Usage: "verbose"},
},
DisableSliceFlagSeparator: true,
Commands: []*cli.Command{
{
Name: "show-profile",
Description: "Show profile",
Usage: "Show profile",
UsageText: "bsky show-profile",
Flags: []cli.Flag{
&cli.StringFlag{Name: "handle", Aliases: []string{"H"}, Value: "", Usage: "user handle"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
Action: doShowProfile,
},
{
Name: "update-profile",
Description: "Update profile",
Usage: "Update profile",
UsageText: "bsky update-profile [OPTIONS]... [{display name} [description]]",
Flags: []cli.Flag{
&cli.StringFlag{Name: "avatar", Value: "", Usage: "avatar image", TakesFile: true},
&cli.StringFlag{Name: "banner", Value: "", Usage: "banner image", TakesFile: true},
},
Action: doUpdateProfile,
},
{
Name: "show-session",
Description: "Show session",
Usage: "Show session",
UsageText: "bsky show-session",
Flags: []cli.Flag{
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
Action: doShowSession,
},
{
Name: "timeline",
Description: "Show timeline",
Usage: "Show timeline",
UsageText: "bsky timeline",
Aliases: []string{"tl"},
Flags: []cli.Flag{
&cli.StringFlag{Name: "handle", Aliases: []string{"H"}, Value: "", Usage: "user handle"},
&cli.IntFlag{Name: "n", Value: 30, Usage: "number of items"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
Action: doTimeline,
},
{
Name: "stream",
Description: "Show timeline as stream",
Usage: "Show timeline as stream",
UsageText: "bsky stream",
Flags: []cli.Flag{
&cli.StringFlag{Name: "cursor", Value: "", Usage: "cursor"},
&cli.StringFlag{Name: "handle", Aliases: []string{"H"}, Value: "", Usage: "user handle"},
&cli.StringFlag{Name: "pattern", Usage: "pattern"},
&cli.StringFlag{Name: "reply", Usage: "reply"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
Action: doStream,
},
{
Name: "thread",
Description: "Show thread",
Usage: "Show thread",
UsageText: "bsky thread [uri]",
Flags: []cli.Flag{
&cli.IntFlag{Name: "n", Value: 30, Usage: "number of items"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
Action: doThread,
},
{
Name: "post",
Description: "Post new text",
Usage: "Post new text",
UsageText: "bsky post [text]",
Flags: []cli.Flag{
&cli.StringFlag{Name: "r"},
&cli.StringFlag{Name: "q"},
&cli.BoolFlag{Name: "stdin"},
&cli.StringSliceFlag{Name: "image", Aliases: []string{"i"}},
&cli.StringSliceFlag{Name: "image-alt", Aliases: []string{"ia"}},
&cli.StringFlag{Name: "video", Aliases: []string{"v"}},
&cli.StringFlag{Name: "video-alt", Aliases: []string{"va"}},
},
HelpName: "post",
ArgsUsage: "[text]",
Action: doPost,
},
{
Name: "vote",
Description: "Vote the post",
Usage: "Vote the post",
UsageText: "bsky vote [uri]",
Flags: []cli.Flag{
&cli.BoolFlag{Name: "down"},
},
HelpName: "vote",
Action: doVote,
},
{
Name: "votes",
Description: "Show votes of the post",
Usage: "Show votes of the post",
UsageText: "bsky votes [uri]",
Flags: []cli.Flag{
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
HelpName: "votes",
Action: doVotes,
ArgsUsage: "[uri]",
},
{
Name: "repost",
Description: "Repost the post",
Usage: "Repost the post",
UsageText: "bsky repost [uri]",
HelpName: "repost",
Action: doRepost,
},
{
Name: "reposts",
Description: "Show reposts of the post",
Usage: "Show reposts of the post",
UsageText: "bsky reposts [uri]",
Flags: []cli.Flag{
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
HelpName: "reposts",
Action: doReposts,
},
{
Name: "follow",
Description: "Follow the handle",
Usage: "Follow the handle",
UsageText: "bsky follow [handle]",
HelpName: "follow",
Action: doFollow,
},
{
Name: "unfollow",
Description: "Unfollow the handle",
Usage: "Unfollow the handle",
UsageText: "bsky unfollow [handle]",
HelpName: "unfollow",
Action: doUnfollow,
},
{
Name: "follows",
Description: "Show follows",
Usage: "Show follows",
UsageText: "bsky follows",
Flags: []cli.Flag{
&cli.StringFlag{Name: "handle", Aliases: []string{"H"}, Value: "", Usage: "user handle"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
HelpName: "follows",
Action: doFollows,
},
{
Name: "followers",
Description: "Show followers",
Usage: "Show followers",
UsageText: "bsky followres",
Flags: []cli.Flag{
&cli.StringFlag{Name: "handle", Aliases: []string{"H"}, Value: "", Usage: "user handle"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
HelpName: "followers",
Action: doFollowers,
},
{
Name: "block",
Description: "Block the handle",
Usage: "Block the handle",
UsageText: "bsky block [handle/did]",
HelpName: "block",
Action: doBlock,
},
{
Name: "unblock",
Description: "Unblock the handle",
Usage: "Unblock the handle",
UsageText: "bsky unblock [handle]",
HelpName: "unblock",
Action: doUnblock,
},
{
Name: "blocks",
Description: "Show blocks",
Usage: "Show blocks",
UsageText: "bsky blocks",
Flags: []cli.Flag{
&cli.StringFlag{Name: "handle", Aliases: []string{"H"}, Value: "", Usage: "user handle"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
HelpName: "blocks",
Action: doBlocks,
},
{
Name: "mute",
Description: "Mute the handle",
Usage: "Mute the handle",
UsageText: "bsky mute [handle/did]",
HelpName: "mute",
Action: doMute,
},
{
Name: "report",
Description: "Report the handle",
Usage: "Report the handle",
UsageText: "bsky report [handle/did]",
HelpName: "report",
Action: doReport,
Flags: []cli.Flag{
&cli.StringFlag{Name: "comment", Usage: "report comment"},
},
},
{
Name: "moderation-list",
Description: "Add the handle to a new moderation list",
Usage: "Add the handle to a new moderation list",
UsageText: "bsky moderation-list [handle/did]",
HelpName: "moderation-list",
Action: doModList,
Flags: []cli.Flag{
&cli.StringFlag{Name: "name", Value: "NewList", Usage: "list name"},
&cli.StringFlag{Name: "description", Aliases: []string{"desc"}, Value: "", Usage: "description"},
},
},
{
Name: "delete",
Description: "Delete the note",
Usage: "Delete the note",
UsageText: "bsky delete [cid]",
HelpName: "delete",
Action: doDelete,
},
{
Name: "search",
Description: "Search Bluesky",
Usage: "Search Bluesky",
UsageText: "bsky search [terms]",
HelpName: "search",
Action: doSearch,
Flags: []cli.Flag{
&cli.IntFlag{Name: "n", Value: 100, Usage: "number of items"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
},
{
Name: "search-actors",
Description: "Search Actors",
Usage: "Search Actors",
UsageText: "bsky search-actors [terms]",
HelpName: "search-actors",
Action: doSearchActors,
Flags: []cli.Flag{
&cli.IntFlag{Name: "n", Value: 100, Usage: "number of items"},
},
},
{
Name: "login",
Description: "Login the social",
Usage: "Login the social",
UsageText: "bsky login [handle] [password]",
Flags: []cli.Flag{
&cli.StringFlag{Name: "host", Value: "https://bsky.social"},
&cli.StringFlag{Name: "bgs", Value: "https://bsky.network"},
},
HelpName: "login",
Action: doLogin,
},
{
Name: "notification",
Description: "Show notifications",
Usage: "Show notifications",
UsageText: "bsky notification",
Aliases: []string{"notif"},
Flags: []cli.Flag{
&cli.BoolFlag{Name: "a", Usage: "show all"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
HelpName: "notification",
Action: doNotification,
},
{
Name: "invite-codes",
Description: "Show invite codes",
Usage: "Show invite codes",
UsageText: "bsky invite-codes",
Flags: []cli.Flag{
&cli.BoolFlag{Name: "used", Usage: "show used codes too"},
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
HelpName: "invite-codes",
Action: doInviteCodes,
},
{
Name: "list-app-passwords",
Description: "Show App-passwords",
Usage: "Show App-passwords",
UsageText: "bsky list-app-passwords",
Flags: []cli.Flag{
&cli.BoolFlag{Name: "json", Usage: "output JSON"},
},
HelpName: "list-app-passwords",
Action: doListAppPasswords,
},
{
Name: "add-app-password",
Description: "Add App-password",
Usage: "Add App-password",
UsageText: "bsky add-app-password",
HelpName: "add-app-password",
Action: doAddAppPassword,
},
{
Name: "revoke-app-password",
Description: "Revoke App-password",
Usage: "Revoke App-password",
UsageText: "bsky revoke-app-password",
HelpName: "revoke-app-password",
Action: doRevokeAppPassword,
},
},
Metadata: map[string]any{},
Before: func(cCtx *cli.Context) error {
profile := cCtx.String("a")
cfg, fp, err := loadConfig(profile)
cCtx.App.Metadata["path"] = fp
if cCtx.Args().Get(0) == "login" {
return nil
}
if err != nil {
return fmt.Errorf("cannot load config file: %w", err)
}
cCtx.App.Metadata["config"] = cfg
cfg.verbose = cCtx.Bool("V")
if profile != "" {
cfg.prefix = profile + "-"
}
return nil
},
}

    if err := app.Run(os.Args); err != nil {
    	fmt.Fprintln(os.Stderr, err)
    	os.Exit(1)
    }

}

================================================
FILE: Makefile
================================================
BIN := bsky
ifeq ($(OS),Windows_NT)
BIN := $(BIN).exe
endif
VERSION := $$(make -s show-version)
CURRENT_REVISION := $(shell git rev-parse --short HEAD)
BUILD_LDFLAGS := "-s -w -X main.revision=$(CURRENT_REVISION)"
GOOS := $(shell go env GOOS)
GOBIN ?= $(shell go env GOPATH)/bin
export GO111MODULE=on

.PHONY: all
all: clean build

.PHONY: build
build:
go build -ldflags=$(BUILD_LDFLAGS) -o $(BIN) .

.PHONY: release
release:
go build -ldflags=$(BUILD_LDFLAGS) -o $(BIN) .
	zip -r bsky-$(GOOS)-$(VERSION).zip $(BIN)

.PHONY: install
install:
go install -ldflags=$(BUILD_LDFLAGS) .

.PHONY: show-version
show-version: $(GOBIN)/gobump
gobump show -r .

$(GOBIN)/gobump:
go install github.com/x-motemen/gobump/cmd/gobump@latest

.PHONY: test
test: build
go test -v ./...

.PHONY: clean
clean:
go clean

.PHONY: bump
bump: $(GOBIN)/gobump
ifneq ($(shell git status --porcelain),)
$(error git workspace is dirty)
endif
ifneq ($(shell git rev-parse --abbrev-ref HEAD),main)
$(error current branch is not main)
endif
	@gobump up -w .
	git commit -am "bump up version to $(VERSION)"
	git tag "v$(VERSION)"
git push origin main
git push origin "refs/tags/v$(VERSION)"

================================================
FILE: password.go
================================================
package main

import (
"context"
"encoding/json"
"fmt"
"os"

    comatproto "github.com/bluesky-social/indigo/api/atproto"

    "github.com/urfave/cli/v2"

)

func doListAppPasswords(cCtx \*cli.Context) error {
if cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    arg := cCtx.String("handle")
    if arg == "" {
    	arg = xrpcc.Auth.Handle
    }

    passwords, err := comatproto.ServerListAppPasswords(context.TODO(), xrpcc)
    if err != nil {
    	return fmt.Errorf("cannot get profile: %w", err)
    }

    if cCtx.Bool("json") {
    	for _, password := range passwords.Passwords {
    		json.NewEncoder(os.Stdout).Encode(password)
    	}
    	return nil
    }

    for _, password := range passwords.Passwords {
    	fmt.Printf("%s (%s)\n", password.Name, password.CreatedAt)
    }
    return nil

}

func doAddAppPassword(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
    	input := &comatproto.ServerCreateAppPassword_Input{
    		Name: arg,
    	}
    	password, err := comatproto.ServerCreateAppPassword(context.TODO(), xrpcc, input)
    	if err != nil {
    		return fmt.Errorf("cannot create app-password: %w", err)
    	}

    	if cCtx.Bool("json") {
    		json.NewEncoder(os.Stdout).Encode(password)
    	} else {
    		fmt.Printf("%s: %s\n", password.Name, password.Password)
    	}
    }
    return nil

}

func doRevokeAppPassword(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
    	input := &comatproto.ServerRevokeAppPassword_Input{
    		Name: arg,
    	}
    	err := comatproto.ServerRevokeAppPassword(context.TODO(), xrpcc, input)
    	if err != nil {
    		return fmt.Errorf("cannot create app-password: %w", err)
    	}
    }
    return nil

}

================================================
FILE: profile.go
================================================
package main

import (
"bytes"
"context"
"encoding/json"
"fmt"
"net/http"
"os"
"strings"
"time"

    comatproto "github.com/bluesky-social/indigo/api/atproto"
    "github.com/bluesky-social/indigo/xrpc"
    "github.com/bluesky-social/indigo/api/bsky"
    lexutil "github.com/bluesky-social/indigo/lex/util"
    "github.com/fatih/color"

    "github.com/urfave/cli/v2"

)

func doShowProfile(cCtx \*cli.Context) error {
if cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    arg := cCtx.String("handle")
    if arg == "" {
    	arg = xrpcc.Auth.Handle
    }

    profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, arg)
    if err != nil {
    	return fmt.Errorf("cannot get profile: %w", err)
    }

    if cCtx.Bool("json") {
    	json.NewEncoder(os.Stdout).Encode(profile)
    	return nil
    }

    fmt.Printf("Did: %s\n", profile.Did)
    fmt.Printf("Handle: %s\n", profile.Handle)
    fmt.Printf("DisplayName: %s\n", stringp(profile.DisplayName))
    fmt.Printf("Description: %s\n", stringp(profile.Description))
    fmt.Printf("Follows: %d\n", int64p(profile.FollowsCount))
    fmt.Printf("Followers: %d\n", int64p(profile.FollowersCount))
    fmt.Printf("Avatar: %s\n", stringp(profile.Avatar))
    fmt.Printf("Banner: %s\n", stringp(profile.Banner))
    return nil

}

func doUpdateProfile(cCtx *cli.Context) error {
// read arguments
var name *string
if cCtx.Args().Len() >= 1 {
v := cCtx.Args().Get(0)
name = &v
}
var desc *string
if cCtx.Args().Len() >= 2 {
v := cCtx.Args().Get(1)
desc = &v
}
// read options
var avatarFn *string
if s := cCtx.String("avatar"); s != "" {
avatarFn = &s
}
var bannerFn \*string
if s := cCtx.String("banner"); s != "" {
bannerFn = &s
}

    if name == nil && desc == nil && avatarFn == nil && bannerFn == nil {
    	return cli.ShowSubcommandHelp(cCtx)
    }

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    currentProfile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, xrpcc.Auth.Handle)
    if err != nil {
    	return fmt.Errorf("cannot get profile: %w", err)
    }
    if name == nil {
    	name = currentProfile.DisplayName
    }
    if desc == nil {
    	desc = currentProfile.Description
    }

    var avatar *lexutil.LexBlob
    if currentProfile.Avatar != nil {
    	currentAvatarCid, currentAvatarType, err := ParseCid(currentProfile.Avatar)
    	if err != nil {
    		return fmt.Errorf("cannot parse avatar cid: %w", err)
    	}
    	avatar = &lexutil.LexBlob{
    		Ref:      lexutil.LexLink(currentAvatarCid),
    		MimeType: currentAvatarType,
    	}
    }
    if avatarFn != nil {
    	b, err := os.ReadFile(*avatarFn)
    	if err != nil {
    		return fmt.Errorf("cannot read image file: %w", err)
    	}

    	resp, err := comatproto.RepoUploadBlob(context.TODO(), xrpcc, bytes.NewReader(b))
    	if err != nil {
    		return fmt.Errorf("cannot upload image file: %w", err)
    	}
    	avatar = &lexutil.LexBlob{
    		Ref:      resp.Blob.Ref,
    		MimeType: http.DetectContentType(b),
    		Size:     resp.Blob.Size,
    	}
    }

    var banner *lexutil.LexBlob
    if currentProfile.Banner != nil {
    	currentBannerCid, currentBannerType, err := ParseCid(currentProfile.Banner)
    	if err != nil {
    		return fmt.Errorf("cannot parse banner cid: %w", err)
    	}
    	banner = &lexutil.LexBlob{
    		Ref:      lexutil.LexLink(currentBannerCid),
    		MimeType: currentBannerType,
    	}
    }

    if bannerFn != nil {
    	b, err := os.ReadFile(*bannerFn)
    	if err != nil {
    		return fmt.Errorf("cannot read image file: %w", err)
    	}
    	resp, err := comatproto.RepoUploadBlob(context.TODO(), xrpcc, bytes.NewReader(b))
    	if err != nil {
    		return fmt.Errorf("cannot upload image file: %w", err)
    	}
    	banner = &lexutil.LexBlob{
    		Ref:      resp.Blob.Ref,
    		MimeType: http.DetectContentType(b),
    		Size:     resp.Blob.Size,
    	}
    }
    currentRecord, err := comatproto.RepoGetRecord(context.TODO(), xrpcc, "", "app.bsky.actor.profile", xrpcc.Auth.Did, "self")
    if err != nil {
    	return fmt.Errorf("cannot get profile: %w", err)
    }

    updatedRecord := &lexutil.LexiconTypeDecoder{Val: &bsky.ActorProfile{
    	Description: desc,
    	DisplayName: name,
    	Avatar:      avatar,
    	Banner:      banner,
    }}

    _, err = comatproto.RepoPutRecord(context.TODO(), xrpcc, &comatproto.RepoPutRecord_Input{
    	Repo:       xrpcc.Auth.Did,
    	Collection: "app.bsky.actor.profile",
    	Rkey:       "self",
    	Record:     updatedRecord,
    	SwapRecord: currentRecord.Cid,
    })

    if err != nil {
    	return fmt.Errorf("cannot update profile: %w", err)
    }
    return nil

}

func doFollow(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
    	profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, arg)
    	if err != nil {
    		return fmt.Errorf("cannot get profile: %w", err)
    	}

    	follow := bsky.GraphFollow{
    		LexiconTypeID: "app.bsky.graph.follow",
    		CreatedAt:     time.Now().Local().Format(time.RFC3339),
    		Subject:       profile.Did,
    	}

    	resp, err := comatproto.RepoCreateRecord(context.TODO(), xrpcc, &comatproto.RepoCreateRecord_Input{
    		Collection: "app.bsky.graph.follow",
    		Repo:       xrpcc.Auth.Did,
    		Record: &lexutil.LexiconTypeDecoder{
    			Val: &follow,
    		},
    	})
    	if err != nil {
    		return err
    	}
    	fmt.Println(resp.Uri)
    }
    return nil

}

func doUnfollow(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
    	profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, arg)
    	if err != nil {
    		return fmt.Errorf("cannot get profile: %w", err)
    	}

    	if profile.Viewer.Following == nil {
    		continue
    	}

    	parts := strings.Split(*profile.Viewer.Following, "/")
    	if len(parts) < 3 {
    		return fmt.Errorf("invalid post uri: %q", arg)
    	}
    	rkey := parts[len(parts)-1]
    	schema := parts[len(parts)-2]
    	fmt.Println(stringp(profile.Viewer.Following))
    	_, err = comatproto.RepoDeleteRecord(context.TODO(), xrpcc, &comatproto.RepoDeleteRecord_Input{
    		Repo:       xrpcc.Auth.Did,
    		Collection: schema,
    		Rkey:       rkey,
    	})
    	if err != nil {
    		return err
    	}
    }
    return nil

}

func doFollows(cCtx \*cli.Context) error {
if cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    arg := cCtx.String("handle")
    if arg == "" {
    	arg = xrpcc.Auth.Handle
    }

    var cursor string
    for {
    	follows, err := bsky.GraphGetFollows(context.TODO(), xrpcc, arg, cursor, 100)
    	if err != nil {
    		return fmt.Errorf("getting record: %w", err)
    	}

    	if cCtx.Bool("json") {
    		for _, f := range follows.Follows {
    			json.NewEncoder(os.Stdout).Encode(f)
    		}
    	} else {
    		for _, f := range follows.Follows {
    			color.Set(color.FgHiRed)
    			fmt.Print(f.Handle)
    			color.Set(color.Reset)
    			fmt.Printf(" [%s] ", stringp(f.DisplayName))
    			color.Set(color.FgBlue)
    			fmt.Println(f.Did)
    			color.Set(color.Reset)
    		}
    	}
    	if follows.Cursor == nil {
    		break
    	}
    	cursor = *follows.Cursor
    }
    return nil

}

func doFollowers(cCtx \*cli.Context) error {
if cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    arg := cCtx.String("handle")
    if arg == "" {
    	arg = xrpcc.Auth.Handle
    }

    var cursor string
    for {
    	followers, err := bsky.GraphGetFollowers(context.TODO(), xrpcc, arg, cursor, 100)
    	if err != nil {
    		return fmt.Errorf("getting record: %w", err)
    	}

    	if cCtx.Bool("json") {
    		for _, f := range followers.Followers {
    			json.NewEncoder(os.Stdout).Encode(f)
    		}
    	} else {
    		for _, f := range followers.Followers {
    			color.Set(color.FgHiRed)
    			fmt.Print(f.Handle)
    			color.Set(color.Reset)
    			fmt.Printf(" [%s] ", stringp(f.DisplayName))
    			color.Set(color.FgBlue)
    			fmt.Println(f.Did)
    			color.Set(color.Reset)
    		}
    	}
    	if followers.Cursor == nil {
    		break
    	}
    	cursor = *followers.Cursor
    }
    return nil

}

func doBlock(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
      var did *string
    if strings.HasPrefix(arg, "did:") {
      did = &arg
    } else {
      profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, arg)
      if err != nil {
        profileErr := err
        result, err := bsky.ActorSearchActors(context.TODO(), xrpcc, "", 50, arg, "")
        if err != nil {
          panic("Failed to search: " + err.Error())
        }
        for _, actor := range result.Actors {
          if err == nil && arg == actor.Handle {
            did = &actor.Did
          }
        }
        if did == nil {
          panic("Failed to get profile: " + profileErr.Error())
        }
      } else {
        did = &profile.Did
      }
    }

    	block := bsky.GraphBlock{
    		LexiconTypeID: "app.bsky.graph.block",
    		CreatedAt:     time.Now().Local().Format(time.RFC3339),
    		Subject:       *did,
    	}

    	resp, err := comatproto.RepoCreateRecord(context.TODO(), xrpcc, &comatproto.RepoCreateRecord_Input{
    		Collection: "app.bsky.graph.block",
    		Repo:       xrpcc.Auth.Did,
    		Record: &lexutil.LexiconTypeDecoder{
    			Val: &block,
    		},
    	})
    	if err != nil {
    		return err
    	}
    	fmt.Println(resp.Uri)
    }
    return nil

}

func doMute(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
      var did *string
    if strings.HasPrefix(arg, "did:") {
      did = &arg
    } else {
      profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, arg)
      if err != nil {
        profileErr := err
        result, err := bsky.ActorSearchActors(context.TODO(), xrpcc, "", 50, arg, "")
        if err != nil {
          panic("Failed to search: " + err.Error())
        }
        for _, actor := range result.Actors {
          if err == nil && arg == actor.Handle {
            did = &actor.Did
          }
        }
        if did == nil {
          panic("Failed to get profile: " + profileErr.Error())
        }
      } else {
        did = &profile.Did
      }
    }

    	err = bsky.GraphMuteActor(context.TODO(), xrpcc, &bsky.GraphMuteActor_Input{Actor: *did})
    	if err != nil {
    		panic("Failed to mute user: " + err.Error())
    	}
    }
    return nil

}

func doReport(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
      var did *string
    if strings.HasPrefix(arg, "did:") {
      did = &arg
    } else {
      profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, arg)
      if err != nil {
        profileErr := err
        result, err := bsky.ActorSearchActors(context.TODO(), xrpcc, "", 50, arg, "")
        if err != nil {
          panic("Failed to search: " + err.Error())
        }
        for _, actor := range result.Actors {
          if err == nil && arg == actor.Handle {
            did = &actor.Did
          }
        }
        if did == nil {
          panic("Failed to get profile: " + profileErr.Error())
        }
      } else {
        did = &profile.Did
      }
    }

    comment := cCtx.String("comment")
    	var reasonType string
    	reasonType = "com.atproto.moderation.defs#reasonSpam"
    	input := map[string]interface{}{
    		"reasonType": reasonType,
    		"subject": map[string]string{
    			"$type": "com.atproto.admin.defs#repoRef",
    			"did": *did,
    		},
    		"comment":   comment,
    		"createdAt": time.Now().Format(time.RFC3339),
    	}

    	var response map[string]interface{}
    	err = xrpcc.Do(context.TODO(), xrpc.Procedure, "application/json", "com.atproto.moderation.createReport", nil, input, &response)
    	if err != nil {
    		panic("Failed to create report: " + err.Error())
    	}

    	fmt.Println("Report created successfully:", response)
    }
    return nil

}

func doModList(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    name := cCtx.String("name")
    description := cCtx.String("description")

var purpose string
purpose = "app.bsky.graph.defs#modlist"
modList := bsky.GraphList{
Name: name,
Purpose: &purpose,
Description: &description,
CreatedAt: time.Now().Format(time.RFC3339),
}

listResp, err := comatproto.RepoCreateRecord(context.TODO(), xrpcc, &comatproto.RepoCreateRecord_Input{
Repo: xrpcc.Auth.Did,
Collection: "app.bsky.graph.list",
Record: &lexutil.LexiconTypeDecoder{
Val: &modList,
},
})
if err != nil {
panic(err)
}

listURI := listResp.Uri
fmt.Println("List created successfully. URI:", listURI)

    for _, arg := range cCtx.Args().Slice() {
      var did *string
    if strings.HasPrefix(arg, "did:") {
      did = &arg
    } else {
      profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, arg)
      if err != nil {
        profileErr := err
        result, err := bsky.ActorSearchActors(context.TODO(), xrpcc, "", 50, arg, "")
        if err != nil {
          panic("Failed to search: " + err.Error())
        }
        for _, actor := range result.Actors {
          if err == nil && arg == actor.Handle {
            did = &actor.Did
          }
        }
        if did == nil {
          panic("Failed to get profile: " + profileErr.Error())
        }
      } else {
        did = &profile.Did
      }
    }

    	listItem := bsky.GraphListitem{
    			Subject: *did,
    			List:    listURI,
    			CreatedAt: time.Now().Format(time.RFC3339),
    	}

    	_, err = comatproto.RepoCreateRecord(context.TODO(), xrpcc, &comatproto.RepoCreateRecord_Input{
    			Repo:       xrpcc.Auth.Did,
    			Collection: "app.bsky.graph.listitem",
    			Record:     &lexutil.LexiconTypeDecoder{
    			  Val: &listItem,
    			},
    	})
    	if err != nil {
    			panic(err)
    	}

    	fmt.Println("User added to moderation list successfully.")
    }
    return nil

}

func doSearchActors(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    n := cCtx.Int64("n")

    for _, arg := range cCtx.Args().Slice() {
    result, err := bsky.ActorSearchActors(context.TODO(), xrpcc, "", n, arg, "")
    if err != nil {
      panic("Failed to search: " + err.Error())
    }
    for _, actor := range result.Actors {
      jsn, err := json.MarshalIndent(&actor, "", "  ")
      if err == nil {
        fmt.Println("Actor: ", string(jsn))
      }
    }
    }
    return nil

}

func doUnblock(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
    	profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, arg)
    	if err != nil {
    		return fmt.Errorf("cannot get profile: %w", err)
    	}

    	if profile.Viewer.Blocking == nil {
    		continue
    	}

    	parts := strings.Split(*profile.Viewer.Blocking, "/")
    	if len(parts) < 3 {
    		return fmt.Errorf("invalid post uri: %q", arg)
    	}
    	rkey := parts[len(parts)-1]
    	schema := parts[len(parts)-2]
    	fmt.Println(stringp(profile.Viewer.Blocking))
    	_, err = comatproto.RepoDeleteRecord(context.TODO(), xrpcc, &comatproto.RepoDeleteRecord_Input{
    		Repo:       xrpcc.Auth.Did,
    		Collection: schema,
    		Rkey:       rkey,
    	})
    	if err != nil {
    		return err
    	}
    }
    return nil

}

func doBlocks(cCtx \*cli.Context) error {
if cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    var cursor string
    for {
    	blocks, err := bsky.GraphGetBlocks(context.TODO(), xrpcc, cursor, 100)
    	if err != nil {
    		return fmt.Errorf("getting record: %w", err)
    	}

    	if cCtx.Bool("json") {
    		for _, f := range blocks.Blocks {
    			json.NewEncoder(os.Stdout).Encode(f)
    		}
    	} else {
    		for _, f := range blocks.Blocks {
    			color.Set(color.FgHiRed)
    			fmt.Print(f.Handle)
    			color.Set(color.Reset)
    			fmt.Printf(" [%s] ", stringp(f.DisplayName))
    			color.Set(color.FgBlue)
    			fmt.Println(f.Did)
    			color.Set(color.Reset)
    		}
    	}
    	if blocks.Cursor == nil {
    		break
    	}
    	cursor = *blocks.Cursor
    }
    return nil

}

func doLogin(cCtx \*cli.Context) error {
fp, \_ := cCtx.App.Metadata["path"].(string)
var cfg config
cfg.Host = cCtx.String("host")
cfg.Bgs = cCtx.String("bgs")
cfg.Handle = cCtx.Args().Get(0)
cfg.Password = cCtx.Args().Get(1)
if cfg.Handle == "" || cfg.Password == "" {
cli.ShowSubcommandHelpAndExit(cCtx, 1)
}
b, err := json.MarshalIndent(&cfg, "", " ")
if err != nil {
return fmt.Errorf("cannot make config file: %w", err)
}
err = os.WriteFile(fp, b, 0644)
if err != nil {
return fmt.Errorf("cannot write config file: %w", err)
}
return nil
}

func doNotification(cCtx \*cli.Context) error {
if cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    notifs, err := bsky.NotificationListNotifications(context.TODO(), xrpcc, "", 50, false, "")
    if err != nil {
    	return err
    }

    if cCtx.Bool("json") {
    	for _, n := range notifs.Notifications {
    		json.NewEncoder(os.Stdout).Encode(n)
    	}
    	return nil
    }

    for _, n := range notifs.Notifications {
    	if !cCtx.Bool("a") && n.IsRead {
    		continue
    	}
    	color.Set(color.FgHiRed)
    	fmt.Print(n.Author.Handle)
    	color.Set(color.Reset)
    	fmt.Printf(" [%s] ", stringp(n.Author.DisplayName))
    	color.Set(color.FgBlue)
    	fmt.Println(n.Author.Did)
    	color.Set(color.Reset)

    	switch v := n.Record.Val.(type) {
    	case *bsky.FeedPost:
    		fmt.Println(" " + n.Reason + " to " + n.Uri)
    	case *bsky.FeedRepost:
    		fmt.Printf(" reposted %s\n", v.Subject.Uri)
    	case *bsky.FeedLike:
    		fmt.Printf(" liked %s\n", v.Subject.Uri)
    	case *bsky.GraphFollow:
    		fmt.Println(" followed you")
    	}

    	bsky.NotificationUpdateSeen(context.TODO(), xrpcc, &bsky.NotificationUpdateSeen_Input{
    		SeenAt: time.Now().Local().Format(time.RFC3339),
    	})
    }

    return nil

}

func doShowSession(cCtx \*cli.Context) error {
xrpcc, err := makeXRPCC(cCtx)
if err != nil {
return fmt.Errorf("cannot create client: %w", err)
}

    session, err := comatproto.ServerGetSession(context.TODO(), xrpcc)
    if err != nil {
    	return err
    }

    if cCtx.Bool("json") {
    	json.NewEncoder(os.Stdout).Encode(session)
    	return nil
    }

    fmt.Printf("Did: %s\n", session.Did)
    fmt.Printf("Email: %s\n", stringp(session.Email))
    fmt.Printf("Handle: %s\n", session.Handle)
    return nil

}

func doInviteCodes(cCtx \*cli.Context) error {
xrpcc, err := makeXRPCC(cCtx)
if err != nil {
return fmt.Errorf("cannot create client: %w", err)
}

    includeUsed := cCtx.Bool("used")

    codes, err := comatproto.ServerGetAccountInviteCodes(context.TODO(), xrpcc, false, includeUsed)
    if err != nil {
    	return err
    }

    if cCtx.Bool("json") {
    	for _, c := range codes.Codes {
    		json.NewEncoder(os.Stdout).Encode(c)
    	}
    	return nil
    }

    for _, c := range codes.Codes {
    	if int64(len(c.Uses)) >= c.Available { // used
    		color.Set(color.FgHiMagenta)
    		fmt.Printf("%s (used)\n", c.Code)
    		color.Set(color.Reset)
    	} else {
    		fmt.Println(c.Code)
    	}
    }

    return nil

}

================================================
FILE: search.go
================================================
package main

import (
"context"
"encoding/json"
"fmt"
"os"
"sort"
"strings"

    "github.com/bluesky-social/indigo/api/bsky"
    "github.com/urfave/cli/v2"

)

func doSearch(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    n := cCtx.Int64("n")

    terms := strings.Join(cCtx.Args().Slice(), " ")

    var results []*bsky.FeedDefs_PostView

    var cursor string

    for {
    	resp, err := bsky.FeedSearchPosts(context.TODO(), xrpcc, "", cursor, "", "", 100, "", terms, "", "", nil, "", "")
    	if err != nil {
    		return fmt.Errorf("cannot perform search: %w", err)
    	}
    	if resp.Cursor != nil {
    		cursor = *resp.Cursor
    	} else {
    		cursor = ""
    	}

    	results = append(results, resp.Posts...)

    	if cursor == "" || int64(len(results)) > n {
    		break
    	}

    }

    sort.Slice(results, func(i, j int) bool {
    	ri := timep(results[i].Record.Val.(*bsky.FeedPost).CreatedAt)
    	rj := timep(results[j].Record.Val.(*bsky.FeedPost).CreatedAt)
    	return ri.Before(rj)
    })
    if int64(len(results)) > n {
    	results = results[len(results)-int(n):]
    }

    if cCtx.Bool("json") {
    	for _, p := range results {
    		json.NewEncoder(os.Stdout).Encode(p)
    	}
    } else {
    	for _, p := range results {
    		printPost(p)
    	}
    }

    return nil

}

================================================
FILE: timeline.go
================================================
package main

import (
"bufio"
"bytes"
"context"
"encoding/json"
"fmt"
"io"
"log"
"log/slog"
"net/http"
"net/url"
"os"
"os/signal"
"path/filepath"
"regexp"
"sort"
"strings"
"syscall"
"time"

    comatproto "github.com/bluesky-social/indigo/api/atproto"
    "github.com/bluesky-social/indigo/api/bsky"
    "github.com/bluesky-social/indigo/events"
    "github.com/bluesky-social/indigo/events/schedulers/sequential"
    lexutil "github.com/bluesky-social/indigo/lex/util"
    "github.com/bluesky-social/indigo/repo"
    "github.com/bluesky-social/indigo/repomgr"
    "github.com/bluesky-social/indigo/xrpc"
    "github.com/fatih/color"
    cid "github.com/ipfs/go-cid"
    "golang.org/x/net/html/charset"

    "github.com/PuerkitoBio/goquery"
    "github.com/gorilla/websocket"
    encoding "github.com/mattn/go-encoding"
    "github.com/urfave/cli/v2"

)

func doThread(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    arg := cCtx.Args().First()
    if !strings.HasPrefix(arg, "at://did:plc:") {
    	arg = "at://did:plc:" + arg
    }

    n := cCtx.Int64("n")
    resp, err := bsky.FeedGetPostThread(context.TODO(), xrpcc, 0, n, arg)
    if err != nil {
    	return fmt.Errorf("cannot get post thread: %w", err)
    }

    replies := resp.Thread.FeedDefs_ThreadViewPost.Replies
    if cCtx.Bool("json") {
    	json.NewEncoder(os.Stdout).Encode(resp.Thread.FeedDefs_ThreadViewPost)
    	for _, p := range replies {
    		json.NewEncoder(os.Stdout).Encode(p)
    	}
    	return nil
    }

    for i := 0; i < len(replies)/2; i++ {
    	replies[i], replies[len(replies)-i-1] = replies[len(replies)-i-1], replies[i]
    }
    printPost(resp.Thread.FeedDefs_ThreadViewPost.Post)
    for _, r := range replies {
    	printPost(r.FeedDefs_ThreadViewPost.Post)
    }
    return nil

}

func doTimeline(cCtx \*cli.Context) error {
if cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    var feed []*bsky.FeedDefs_FeedViewPost

    n := cCtx.Int64("n")
    handle := cCtx.String("handle")

    var cursor string

    for {
    	if handle != "" {
    		if handle == "self" {
    			handle = xrpcc.Auth.Did
    		}
    		resp, err := bsky.FeedGetAuthorFeed(context.TODO(), xrpcc, handle, cursor, "", false, n)
    		if err != nil {
    			return fmt.Errorf("cannot get author feed: %w", err)
    		}
    		feed = append(feed, resp.Feed...)
    		if resp.Cursor != nil {
    			cursor = *resp.Cursor
    		} else {
    			cursor = ""
    		}
    	} else {
    		resp, err := bsky.FeedGetTimeline(context.TODO(), xrpcc, "reverse-chronological", cursor, n)
    		if err != nil {
    			return fmt.Errorf("cannot get timeline: %w", err)
    		}
    		feed = append(feed, resp.Feed...)
    		if resp.Cursor != nil {
    			cursor = *resp.Cursor
    		} else {
    			cursor = ""
    		}
    	}
    	if cursor == "" || int64(len(feed)) > n {
    		break
    	}
    }

    sort.Slice(feed, func(i, j int) bool {
    	ri := timep(feed[i].Post.Record.Val.(*bsky.FeedPost).CreatedAt)
    	rj := timep(feed[j].Post.Record.Val.(*bsky.FeedPost).CreatedAt)
    	return ri.Before(rj)
    })
    if int64(len(feed)) > n {
    	feed = feed[len(feed)-int(n):]
    }
    if cCtx.Bool("json") {
    	for _, p := range feed {
    		json.NewEncoder(os.Stdout).Encode(p)
    	}
    } else {
    	for _, p := range feed {
    		//if p.Reason != nil {
    		//continue
    		//}
    		printPost(p.Post)
    	}
    }

    return nil

}

func doDelete(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
    	if !strings.HasPrefix(arg, "at://did:plc:") {
    		arg = "at://did:plc:" + arg
    	}
    	parts := strings.Split(arg, "/")
    	if len(parts) < 3 {
    		return fmt.Errorf("invalid post uri: %q", arg)
    	}
    	rkey := parts[len(parts)-1]
    	schema := parts[len(parts)-2]

    	_, err = comatproto.RepoDeleteRecord(context.TODO(), xrpcc, &comatproto.RepoDeleteRecord_Input{
    		Repo:       xrpcc.Auth.Did,
    		Collection: schema,
    		Rkey:       rkey,
    	})
    	if err != nil {
    		return fmt.Errorf("cannot delete post: %w", err)
    	}
    }
    return nil

}

func addLink(xrpcc *xrpc.Client, post *bsky.FeedPost, link string) {
if post.Embed != nil && post.Embed.EmbedExternal != nil {
return
}
res, err := http.Get(link)
if err != nil {
return
}
defer res.Body.Close()

    br := bufio.NewReader(res.Body)
    var reader io.Reader = br

    data, err2 := br.Peek(1024)
    if err2 == nil {
    	enc, name, _ := charset.DetermineEncoding(data, res.Header.Get("content-type"))
    	if enc != nil {
    		reader = enc.NewDecoder().Reader(br)
    	} else if len(name) > 0 {
    		enc := encoding.GetEncoding(name)
    		if enc != nil {
    			reader = enc.NewDecoder().Reader(br)
    		}
    	}
    }

    var title string
    var description string
    var imgURL string
    doc, err := goquery.NewDocumentFromReader(reader)
    if err == nil {
    	title = doc.Find(`title`).Text()
    	description, _ = doc.Find(`meta[property="description"]`).Attr("content")
    	imgURL, _ = doc.Find(`meta[property="og:image"]`).Attr("content")
    	if title == "" {
    		title, _ = doc.Find(`meta[property="og:title"]`).Attr("content")
    		if title == "" {
    			title = link
    		}
    	}
    	if description == "" {
    		description, _ = doc.Find(`meta[property="og:description"]`).Attr("content")
    		if description == "" {
    			description = link
    		}
    	}
    	if post.Embed == nil {
    		post.Embed = &bsky.FeedPost_Embed{}
    	}
    	post.Embed.EmbedExternal = &bsky.EmbedExternal{
    		External: &bsky.EmbedExternal_External{
    			Description: description,
    			Title:       title,
    			Uri:         link,
    		},
    	}
    } else {
    	post.Embed.EmbedExternal = &bsky.EmbedExternal{
    		External: &bsky.EmbedExternal_External{
    			Uri: link,
    		},
    	}
    }
    if imgURL != "" && post.Embed.EmbedExternal != nil {
    	resp, err := http.Get(imgURL)
    	if err == nil && resp.StatusCode == http.StatusOK {
    		defer resp.Body.Close()
    		b, err := io.ReadAll(resp.Body)
    		if err == nil {
    			resp, err := comatproto.RepoUploadBlob(context.TODO(), xrpcc, bytes.NewReader(b))
    			if err == nil {
    				post.Embed.EmbedExternal.External.Thumb = &lexutil.LexBlob{
    					Ref:      resp.Blob.Ref,
    					MimeType: http.DetectContentType(b),
    					Size:     resp.Blob.Size,
    				}
    			}
    		}
    	}
    }

}

func doPost(cCtx \*cli.Context) error {
stdin := cCtx.Bool("stdin")
if !stdin && !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}
text := strings.Join(cCtx.Args().Slice(), " ")
if stdin {
b, err := io.ReadAll(os.Stdin)
if err != nil {
return err
}
text = string(b)
}
if strings.TrimSpace(text) == "" {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    // reply
    var reply *bsky.FeedPost_ReplyRef
    replyTo := cCtx.String("r")
    if replyTo != "" {
    	parts := strings.Split(replyTo, "/")
    	if len(parts) < 3 {
    		return fmt.Errorf("invalid post uri: %q", replyTo)
    	}
    	rkey := parts[len(parts)-1]
    	collection := parts[len(parts)-2]
    	did := parts[2]

    	resp, err := comatproto.RepoGetRecord(context.TODO(), xrpcc, "", collection, did, rkey)
    	if err != nil {
    		return fmt.Errorf("cannot get record: %w", err)
    	}
    	orig := resp.Value.Val.(*bsky.FeedPost)
    	reply = &bsky.FeedPost_ReplyRef{
    		Root:   &comatproto.RepoStrongRef{Cid: *resp.Cid, Uri: resp.Uri},
    		Parent: &comatproto.RepoStrongRef{Cid: *resp.Cid, Uri: resp.Uri},
    	}
    	if orig.Reply != nil && orig.Reply.Root != nil {
    		reply.Root = &comatproto.RepoStrongRef{Cid: orig.Reply.Root.Cid, Uri: orig.Reply.Root.Uri}
    	} else {
    		reply.Root = &comatproto.RepoStrongRef{Cid: *resp.Cid, Uri: resp.Uri}
    	}
    }

    post := &bsky.FeedPost{
    	Text:      text,
    	CreatedAt: time.Now().Local().Format(time.RFC3339),
    	Reply:     reply,
    }

    // quote
    quoteTo := cCtx.String("q")
    if quoteTo != "" {
    	parts := strings.Split(quoteTo, "/")
    	if len(parts) < 3 {
    		return fmt.Errorf("invalid post uri: %q", replyTo)
    	}
    	rkey := parts[len(parts)-1]
    	collection := parts[len(parts)-2]
    	did := parts[2]

    	resp, err := comatproto.RepoGetRecord(context.TODO(), xrpcc, "", collection, did, rkey)
    	if err != nil {
    		return fmt.Errorf("cannot get record: %w", err)
    	}

    	if post.Embed == nil {
    		post.Embed = &bsky.FeedPost_Embed{}
    	}
    	post.Embed.EmbedRecord = &bsky.EmbedRecord{
    		//LexiconTypeID: "app.bsky.feed.post",
    		Record: &comatproto.RepoStrongRef{Cid: *resp.Cid, Uri: resp.Uri},
    	}
    }

    for _, entry := range extractLinksBytes(text) {
    	post.Facets = append(post.Facets, &bsky.RichtextFacet{
    		Features: []*bsky.RichtextFacet_Features_Elem{
    			{
    				RichtextFacet_Link: &bsky.RichtextFacet_Link{
    					Uri: entry.text,
    				},
    			},
    		},
    		Index: &bsky.RichtextFacet_ByteSlice{
    			ByteStart: entry.start,
    			ByteEnd:   entry.end,
    		},
    	})

    	addLink(xrpcc, post, entry.text)
    }

    for _, entry := range extractMentionsBytes(text) {
    	profile, err := bsky.ActorGetProfile(context.TODO(), xrpcc, entry.text)
    	if err != nil {
    		continue
    	}
    	post.Facets = append(post.Facets, &bsky.RichtextFacet{
    		Features: []*bsky.RichtextFacet_Features_Elem{
    			{
    				RichtextFacet_Mention: &bsky.RichtextFacet_Mention{
    					Did: profile.Did,
    				},
    			},
    		},
    		Index: &bsky.RichtextFacet_ByteSlice{
    			ByteStart: entry.start,
    			ByteEnd:   entry.end,
    		},
    	})
    }

    for _, entry := range extractTagsBytes(text) {
    	post.Facets = append(post.Facets, &bsky.RichtextFacet{
    		Features: []*bsky.RichtextFacet_Features_Elem{
    			{
    				RichtextFacet_Tag: &bsky.RichtextFacet_Tag{
    					Tag: entry.text,
    				},
    			},
    		},
    		Index: &bsky.RichtextFacet_ByteSlice{
    			ByteStart: entry.start,
    			ByteEnd:   entry.end,
    		},
    	})
    }

    // embeded images
    imageFn := cCtx.StringSlice("image")
    imageAltFn := cCtx.StringSlice("image-alt")
    if len(imageFn) > 0 {
    	var images []*bsky.EmbedImages_Image
    	for i, fn := range imageFn {
    		b, err := os.ReadFile(fn)
    		if err != nil {
    			return fmt.Errorf("cannot read image file: %w", err)
    		}
    		resp, err := comatproto.RepoUploadBlob(context.TODO(), xrpcc, bytes.NewReader(b))
    		if err != nil {
    			return fmt.Errorf("cannot upload image file: %w", err)
    		}
    		var alt string
    		if i < len(imageAltFn) {
    			alt = imageAltFn[i]
    		} else {
    			alt = filepath.Base(fn)
    		}
    		images = append(images, &bsky.EmbedImages_Image{
    			Alt: alt,
    			Image: &lexutil.LexBlob{
    				Ref:      resp.Blob.Ref,
    				MimeType: http.DetectContentType(b),
    				Size:     resp.Blob.Size,
    			},
    		})
    	}
    	if post.Embed == nil {
    		post.Embed = &bsky.FeedPost_Embed{}
    	}
    	post.Embed.EmbedImages = &bsky.EmbedImages{
    		Images: images,
    	}
    }

    // embeded videos
    videoFn := cCtx.String("video")
    videoAltFn := cCtx.String("video-alt")
    if videoFn != "" {
    	b, err := os.ReadFile(videoFn)
    	if err != nil {
    		return fmt.Errorf("cannot read video file: %w", err)
    	}
    	resp, err := comatproto.RepoUploadBlob(context.TODO(), xrpcc, bytes.NewReader(b))
    	if err != nil {
    		return fmt.Errorf("cannot upload video file: %w", err)
    	}
    	var alt string
    	if videoAltFn != "" {
    		alt = videoAltFn
    	} else {
    		alt = filepath.Base(videoFn)
    	}
    	if post.Embed == nil {
    		post.Embed = &bsky.FeedPost_Embed{}
    	}
    	post.Embed.EmbedVideo = &bsky.EmbedVideo{
    		Alt:      &alt,
    		Captions: []*bsky.EmbedVideo_Caption{},
    		Video: &lexutil.LexBlob{
    			Ref:      resp.Blob.Ref,
    			MimeType: http.DetectContentType(b),
    			Size:     resp.Blob.Size,
    		},
    	}
    }

    resp, err := comatproto.RepoCreateRecord(context.TODO(), xrpcc, &comatproto.RepoCreateRecord_Input{
    	Collection: "app.bsky.feed.post",
    	Repo:       xrpcc.Auth.Did,
    	Record: &lexutil.LexiconTypeDecoder{
    		Val: post,
    	},
    })
    if err != nil {
    	return fmt.Errorf("failed to create post: %w", err)
    }
    fmt.Println(resp.Uri)

    return nil

}

func doVote(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
    	if !strings.HasPrefix(arg, "at://did:plc:") {
    		arg = "at://did:plc:" + arg
    	}
    	parts := strings.Split(arg, "/")
    	if len(parts) < 3 {
    		return fmt.Errorf("invalid post uri: %q", arg)
    	}
    	rkey := parts[len(parts)-1]
    	collection := parts[len(parts)-2]
    	did := parts[2]

    	resp, err := comatproto.RepoGetRecord(context.TODO(), xrpcc, "", collection, did, rkey)
    	if err != nil {
    		return fmt.Errorf("getting record: %w", err)
    	}

    	voteResp, err := comatproto.RepoCreateRecord(context.TODO(), xrpcc, &comatproto.RepoCreateRecord_Input{
    		Collection: "app.bsky.feed.like",
    		Repo:       xrpcc.Auth.Did,
    		Record: &lexutil.LexiconTypeDecoder{
    			Val: &bsky.FeedLike{
    				CreatedAt: time.Now().Format("2006-01-02T15:04:05.000Z"),
    				Subject:   &comatproto.RepoStrongRef{Uri: resp.Uri, Cid: *resp.Cid},
    			},
    		},
    	})

    	if err != nil {
    		return fmt.Errorf("cannot create vote: %w", err)
    	}
    	fmt.Println(voteResp.Uri)
    }

    return nil

}

func doVotes(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    arg := cCtx.Args().First()
    if !strings.HasPrefix(arg, "at://did:plc:") {
    	arg = "at://did:plc:" + arg
    }
    parts := strings.Split(arg, "/")
    if len(parts) < 3 {
    	return fmt.Errorf("invalid post uri: %q", arg)
    }
    rkey := parts[len(parts)-1]
    collection := parts[len(parts)-2]
    did := parts[2]

    resp, err := comatproto.RepoGetRecord(context.TODO(), xrpcc, "", collection, did, rkey)
    if err != nil {
    	return fmt.Errorf("getting record: %w", err)
    }

    votes, err := bsky.FeedGetLikes(context.TODO(), xrpcc, *resp.Cid, "", 50, resp.Uri)
    if err != nil {
    	return fmt.Errorf("getting votes: %w", err)
    }

    if cCtx.Bool("json") {
    	for _, v := range votes.Likes {
    		json.NewEncoder(os.Stdout).Encode(v)
    	}
    	return nil
    }

    for _, v := range votes.Likes {
    	fmt.Print("👍 ")
    	color.Set(color.FgHiRed)
    	fmt.Print(v.Actor.Handle)
    	color.Set(color.Reset)
    	fmt.Printf(" [%s]", stringp(v.Actor.DisplayName))
    	fmt.Printf(" (%v)\n", timep(v.CreatedAt))
    }

    return nil

}

func doRepost(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    for _, arg := range cCtx.Args().Slice() {
    	if !strings.HasPrefix(arg, "at://did:plc:") {
    		arg = "at://did:plc:" + arg
    	}
    	parts := strings.Split(arg, "/")
    	if len(parts) < 3 {
    		return fmt.Errorf("invalid post uri: %q", arg)
    	}
    	rkey := parts[len(parts)-1]
    	collection := parts[len(parts)-2]
    	did := parts[2]

    	resp, err := comatproto.RepoGetRecord(context.TODO(), xrpcc, "", collection, did, rkey)
    	if err != nil {
    		return fmt.Errorf("getting record: %w", err)
    	}

    	repost := &bsky.FeedRepost{
    		CreatedAt: time.Now().Local().Format(time.RFC3339),
    		Subject: &comatproto.RepoStrongRef{
    			Uri: resp.Uri,
    			Cid: *resp.Cid,
    		},
    	}
    	repostResp, err := comatproto.RepoCreateRecord(context.TODO(), xrpcc, &comatproto.RepoCreateRecord_Input{
    		Collection: "app.bsky.feed.repost",
    		Repo:       xrpcc.Auth.Did,
    		Record: &lexutil.LexiconTypeDecoder{
    			Val: repost,
    		},
    	})
    	if err != nil {
    		return fmt.Errorf("cannot create repost: %w", err)
    	}
    	fmt.Println(repostResp.Uri)
    }

    return nil

}

func doReposts(cCtx \*cli.Context) error {
if !cCtx.Args().Present() {
return cli.ShowSubcommandHelp(cCtx)
}

    xrpcc, err := makeXRPCC(cCtx)
    if err != nil {
    	return fmt.Errorf("cannot create client: %w", err)
    }

    arg := cCtx.Args().First()
    if !strings.HasPrefix(arg, "at://did:plc:") {
    	arg = "at://did:plc:" + arg
    }
    parts := strings.Split(arg, "/")
    if len(parts) < 3 {
    	return fmt.Errorf("invalid post uri: %q", arg)
    }
    rkey := parts[len(parts)-1]
    collection := parts[len(parts)-2]
    did := parts[2]

    resp, err := comatproto.RepoGetRecord(context.TODO(), xrpcc, "", collection, did, rkey)
    if err != nil {
    	return fmt.Errorf("getting record: %w", err)
    }

    reposts, err := bsky.FeedGetRepostedBy(context.TODO(), xrpcc, "", *resp.Cid, 50, resp.Uri)
    if err != nil {
    	return fmt.Errorf("getting reposts: %w", err)
    }

    if cCtx.Bool("json") {
    	for _, r := range reposts.RepostedBy {
    		json.NewEncoder(os.Stdout).Encode(r)
    	}
    	return nil
    }

    for _, r := range reposts.RepostedBy {
    	fmt.Printf("⚡ ")
    	color.Set(color.FgHiRed)
    	fmt.Print(r.Handle)
    	color.Set(color.Reset)
    	fmt.Printf(" [%s]\n", stringp(r.DisplayName))
    }

    return nil

}

func doStream(cCtx *cli.Context) error {
var host string
if cCtx.Args().Present() {
host = cCtx.Args().First()
} else {
cfg := cCtx.App.Metadata["config"].(*config)
host = cfg.Bgs
if host == "" {
host = cfg.Host
}
u, err := url.Parse(host)
if err != nil {
return err
}
u.Scheme = "wss"
u.Path = "/xrpc/com.atproto.sync.subscribeRepos"
cur := cCtx.String("cursor")
if cur != "" {
u.Query().Add("cursor", cur)
}
host = u.String()
}
pattern := cCtx.String("pattern")
reply := cCtx.String("reply")

    var re *regexp.Regexp
    if pattern != "" {
    	var err error
    	re, err = regexp.Compile(pattern)
    	if err != nil {
    		return err
    	}
    }

    ch := make(chan os.Signal)
    signal.Notify(ch, syscall.SIGINT)

    con, _, err := websocket.DefaultDialer.Dial(host, http.Header{})
    if err != nil {
    	return fmt.Errorf("dial failure: %w", err)
    }

    defer func() {
    	_ = con.Close()
    }()

    ctx, cancel := context.WithCancel(context.Background())

    go func() {
    	<-ch
    	cancel()
    	con.Close()
    }()

    enc := json.NewEncoder(os.Stdout)

    cb := func(op repomgr.EventKind, seq int64, path string, did string, rcid *cid.Cid, rec any) error {
    	type Rec struct {
    		Op   repomgr.EventKind `json:"op"`
    		Seq  int64             `json:"seq"`
    		Path string            `json:"path"`
    		Did  string            `json:"did"`
    		Rcid *cid.Cid          `json:"rcid"`
    		Rec  any               `json:"rec"`
    	}

    	orig, isPost := rec.(*bsky.FeedPost)

    	if re != nil {
    		if !isPost || !re.MatchString(orig.Text) {
    			return nil
    		}
    	}
    	if cCtx.Bool("json") {
    		enc.Encode(Rec{
    			Op:   op,
    			Seq:  seq,
    			Path: path,
    			Did:  did,
    			Rcid: rcid,
    			Rec:  rec,
    		})
    	} else if isPost {
    		xrpcc, err := makeXRPCC(cCtx)
    		if err != nil {
    			return fmt.Errorf("cannot create client: %w", err)
    		}
    		var post bsky.FeedDefs_PostView
    		if author, err := bsky.ActorGetProfile(context.TODO(), xrpcc, did); err == nil {
    			post.Author = &bsky.ActorDefs_ProfileViewBasic{
    				Avatar:      author.Avatar,
    				Did:         author.Did,
    				DisplayName: author.DisplayName,
    				Handle:      author.Handle,
    				Labels:      author.Labels,
    				Viewer:      author.Viewer,
    			}
    			post.Record = &lexutil.LexiconTypeDecoder{
    				Val: orig,
    			}
    			printPost(&post)
    		}
    	}
    	if orig != nil && reply != "" {
    		xrpcc, err := makeXRPCC(cCtx)
    		if err != nil {
    			return fmt.Errorf("cannot create client: %w", err)
    		}
    		parts := strings.Split(path, "/")
    		getResp, err := comatproto.RepoGetRecord(context.TODO(), xrpcc, "", parts[0], did, parts[1])
    		if err != nil {
    			return fmt.Errorf("cannot get record: %w", err)
    		}

    		orig := getResp.Value.Val.(*bsky.FeedPost)
    		replyTo := &bsky.FeedPost_ReplyRef{
    			Root:   &comatproto.RepoStrongRef{Cid: *getResp.Cid, Uri: getResp.Uri},
    			Parent: &comatproto.RepoStrongRef{Cid: *getResp.Cid, Uri: getResp.Uri},
    		}
    		if orig.Reply != nil && orig.Reply.Root != nil {
    			replyTo.Root = &comatproto.RepoStrongRef{Cid: orig.Reply.Root.Cid, Uri: orig.Reply.Root.Uri}
    		} else {
    			replyTo.Root = &comatproto.RepoStrongRef{Cid: *getResp.Cid, Uri: getResp.Uri}
    		}
    		post := &bsky.FeedPost{
    			Text:      reply,
    			CreatedAt: time.Now().Local().Format(time.RFC3339),
    			Reply:     replyTo,
    		}

    		resp, err := comatproto.RepoCreateRecord(context.TODO(), xrpcc, &comatproto.RepoCreateRecord_Input{
    			Collection: "app.bsky.feed.post",
    			Repo:       xrpcc.Auth.Did,
    			Record: &lexutil.LexiconTypeDecoder{
    				Val: post,
    			},
    		})
    		if err != nil {
    			log.Println(err, resp.Uri)
    		}
    	}
    	return nil
    }

    rsc := &events.RepoStreamCallbacks{
    	RepoCommit: func(evt *comatproto.SyncSubscribeRepos_Commit) error {
    		if evt.TooBig {
    			log.Printf("skipping too big events for now: %d", evt.Seq)
    			return nil
    		}
    		r, err := repo.ReadRepoFromCar(ctx, bytes.NewReader(evt.Blocks))
    		if err != nil {
    			return fmt.Errorf("reading repo from car (seq: %d, len: %d): %w", evt.Seq, len(evt.Blocks), err)
    		}

    		for _, op := range evt.Ops {
    			ek := repomgr.EventKind(op.Action)
    			switch ek {
    			case repomgr.EvtKindCreateRecord, repomgr.EvtKindUpdateRecord:
    				rc, rec, err := r.GetRecord(ctx, op.Path)
    				if err != nil {
    					e := fmt.Errorf("getting record %s (%s) within seq %d for %s: %w", op.Path, *op.Cid, evt.Seq, evt.Repo, err)
    					log.Print(e)
    					continue
    				}

    				if lexutil.LexLink(rc) != *op.Cid {
    					// TODO: do we even error here?
    					return fmt.Errorf("mismatch in record and op cid: %s != %s", rc, *op.Cid)
    				}

    				if err := cb(ek, evt.Seq, op.Path, evt.Repo, &rc, rec); err != nil {
    					log.Printf("event consumer callback (%s): %s", ek, err)
    					continue
    				}

    			case repomgr.EvtKindDeleteRecord:
    				if err := cb(ek, evt.Seq, op.Path, evt.Repo, nil, nil); err != nil {
    					log.Printf("event consumer callback (%s): %s", ek, err)
    					continue
    				}
    			}
    		}
    		return nil
    	},
    }

    return events.HandleRepoStream(ctx, con, sequential.NewScheduler("stream", rsc.EventHandler), slog.Default())

}

================================================
FILE: util.go
================================================
package main

import (
"context"
"encoding/json"
"fmt"
"net/url"
"os"
"path/filepath"
"regexp"
"sort"
"strings"
"time"

    comatproto "github.com/bluesky-social/indigo/api/atproto"
    "github.com/bluesky-social/indigo/api/bsky"
    cliutil "github.com/bluesky-social/indigo/util/cliutil"
    "github.com/bluesky-social/indigo/xrpc"
    "github.com/fatih/color"
    cidDecode "github.com/ipfs/go-cid"

    "github.com/urfave/cli/v2"

)

func printPost(p *bsky.FeedDefs_PostView) {
rec := p.Record.Val.(*bsky.FeedPost)
color.Set(color.FgHiRed)
fmt.Print(p.Author.Handle)
color.Set(color.Reset)
fmt.Printf(" [%s]", stringp(p.Author.DisplayName))
fmt.Printf(" (%s)\n", timep(rec.CreatedAt).Format(time.RFC3339))
if rec.Entities != nil {
sort.Slice(rec.Entities, func(i, j int) bool {
return rec.Entities[i].Index.Start < rec.Entities[j].Index.Start
})
rs := []rune(rec.Text)
off := int64(0)
for _, e := range rec.Entities {
if e.Index.Start < 0 {
e.Index.Start = 0
}
if e.Index.End > int64(len(rs)) {
e.Index.End = int64(len(rs))
}
fmt.Print(string(rs[off:e.Index.Start]))
if e.Type == "mention" {
color.Set(color.Bold)
} else {
color.Set(color.Underline)
}
fmt.Print(string(rs[e.Index.Start:e.Index.End]))
color.Set(color.Reset)
off = e.Index.End
}
if off < int64(len(rs)) {
fmt.Print(string(rs[off:]))
}
fmt.Println()
//for _, e := range rec.Entities {
// fmt.Printf(" {%s}\n", e.Value)
//}
} else {
fmt.Println(rec.Text)
}
if p.Embed != nil {
if p.Embed.EmbedImages*View != nil {
for *, i := range p.Embed.EmbedImages_View.Images {
fmt.Println(" {" + i.Fullsize + "}")
}
}
}
fmt.Printf(" 👍(%d)⚡(%d)↩️ (%d)\n",
int64p(p.LikeCount),
int64p(p.RepostCount),
int64p(p.ReplyCount),
)
if rec.Reply != nil && rec.Reply.Parent != nil {
fmt.Print(" > ")
color.Set(color.FgBlue)
fmt.Println(rec.Reply.Parent.Uri)
color.Set(color.Reset)
}
fmt.Print(" - ")
color.Set(color.FgBlue)
fmt.Println(p.Uri)
color.Set(color.Reset)
fmt.Println()
}

var formats = []string{
"2006-01-02T15:04:05",
"2006-01-02T15:04:05Z",
"2006-01-02T15:04:05.000Z",
"2006-01-02T15:04:05.000000Z",
"2006-01-02T15:04:05-07:00",
}

func timep(s string) time.Time {
for \_, f := range formats {
t, err := time.Parse(f, s)
if err == nil {
return t.Local()
}
}
panic(s)
}

func int64p(i *int64) int64 {
if i == nil {
return 0
}
return *i
}

func stringp(s *string) string {
if s == nil {
return ""
}
return *s
}

func makeXRPCC(cCtx *cli.Context) (*xrpc.Client, error) {
cfg := cCtx.App.Metadata["config"].(\*config)

    xrpcc := &xrpc.Client{
    	Client: cliutil.NewHttpClient(),
    	Host:   cfg.Host,
    	Auth:   &xrpc.AuthInfo{Handle: cfg.Handle},
    }

    auth, err := cliutil.ReadAuth(filepath.Join(cfg.dir, cfg.prefix+cfg.Handle+".auth"))
    if err == nil {
    	xrpcc.Auth = auth
    	xrpcc.Auth.AccessJwt = xrpcc.Auth.RefreshJwt
    	refresh, err2 := comatproto.ServerRefreshSession(context.TODO(), xrpcc)
    	if err2 != nil {
    		err = err2
    	} else {
    		xrpcc.Auth.Did = refresh.Did
    		xrpcc.Auth.AccessJwt = refresh.AccessJwt
    		xrpcc.Auth.RefreshJwt = refresh.RefreshJwt

    		b, err := json.Marshal(xrpcc.Auth)
    		if err == nil {
    			if err := os.WriteFile(filepath.Join(cfg.dir, cfg.prefix+cfg.Handle+".auth"), b, 0600); err != nil {
    				return nil, fmt.Errorf("cannot write auth file: %w", err)
    			}
    		}
    	}
    }
    if err != nil {
    	auth, err := comatproto.ServerCreateSession(context.TODO(), xrpcc, &comatproto.ServerCreateSession_Input{
    		Identifier: xrpcc.Auth.Handle,
    		Password:   cfg.Password,
    	})
    	if err != nil {
    		return nil, fmt.Errorf("cannot create session: %w", err)
    	}
    	xrpcc.Auth.Did = auth.Did
    	xrpcc.Auth.AccessJwt = auth.AccessJwt
    	xrpcc.Auth.RefreshJwt = auth.RefreshJwt

    	b, err := json.MarshalIndent(xrpcc.Auth, "", "  ")
    	if err == nil {
    		if err := os.WriteFile(filepath.Join(cfg.dir, cfg.prefix+cfg.Handle+".auth"), b, 0600); err != nil {
    			return nil, fmt.Errorf("cannot write auth file: %w", err)
    		}
    	}
    }

    return xrpcc, nil

}

var avatarOrBannerUrlRegex = regexp.MustCompile(`^https://cdn\.bsky\.app/img/(avatar|banner)/plain/did:plc:[a-z0-9]+/[a-z0-9]+@+[a-z]+$`)

func ParseCid(cidUrl \*string) (cidDecode.Cid, string, error) {
if cidUrl == nil {
return cidDecode.Cid{}, "", fmt.Errorf("URL is not provided")
}

    if !avatarOrBannerUrlRegex.MatchString(*cidUrl) {
    	return cidDecode.Cid{}, "", fmt.Errorf("URL does not match expected format")
    }

    parsedCidUrl, err := url.Parse(*cidUrl)
    if err != nil {
    	return cidDecode.Cid{}, "", fmt.Errorf("failed to parse URL: %w", err)
    }

    pathSegments := strings.Split(parsedCidUrl.Path, "/")
    cid := pathSegments[len(pathSegments)-1]

    cidParts := strings.Split(cid, "@")
    if len(cidParts) < 2 {
    	return cidDecode.Cid{}, "", fmt.Errorf("CID does not contain image type")
    }

    cid, imageType := cidParts[0], cidParts[1]
    decodedCid, err := cidDecode.Decode(cid)
    if err != nil {
    	return cidDecode.Cid{}, "", fmt.Errorf("failed to decode CID: %w", err)
    }

    return decodedCid, "image/" + imageType, nil

}

================================================
FILE: util_test.go
================================================
package main

import (
"testing"
"time"
)

func TestTimep(t \*testing.T) {
want := "2023-02-03T18:19:20Z"
got := timep(want).UTC().Format(time.RFC3339)
if got != want {
t.Fatalf("want %q but got %q", want, got)
}

    want = "2023-02-03T18:19:20.333Z"
    got = timep(want).UTC().Format(time.RFC3339)
    if got == want {
    	t.Fatalf("want %q but got %q", want, got)
    }

    want = "2023-02-03T18:19:20"
    got = timep(want).UTC().Format(time.RFC3339)
    if got == want {
    	t.Fatal("should not be possible to parse")
    }

}

func TestStringp(t \*testing.T) {
want := "test"
got := stringp(&want)
if got != want {
t.Fatalf("want %q but got %q", want, got)
}

    want = ""
    got = stringp(nil)
    if got != want {
    	t.Fatalf("want %q but got %q", want, got)
    }

}

================================================
FILE: scripts/autocomplete.sh
================================================
#! /bin/bash

: ${PROG:=$(basename ${BASH_SOURCE})}

# Macs have bash3 for which the bash-completion package doesn't include

# \_init_completion. This is a minimal version of that function.

\_cli_init_completion() {
COMPREPLY=()
\_get_comp_words_by_ref "$@" cur prev words cword
}

\_cli_bash_autocomplete() {
if [["${COMP_WORDS[0]}" != "source"]]; then
local cur opts base words
COMPREPLY=()
cur="${COMP_WORDS[COMP_CWORD]}"
    if declare -F _init_completion >/dev/null 2>&1; then
      _init_completion -n "=:" || return
    else
      _cli_init_completion -n "=:" || return
    fi
    words=("${words[@]:0:$cword}")
    if [[ "$cur" == "-"_ ]]; then
requestComp="${words[_]} ${cur} --generate-shell-completion"
    else
      requestComp="${words[*]} --generate-shell-completion"
fi
opts=$(eval "${requestComp}" 2>/dev/null)
COMPREPLY=($(compgen -W "${opts}" -- ${cur}))
return 0
fi
}

complete -o bashdefault -o default -o nospace -F \_cli_bash_autocomplete $PROG
unset PROG

================================================
FILE: scripts/autocomplete.zsh
================================================
compdef \_bsky bsky

\_bsky() {
local -a opts
local cur
cur=${words[-1]}
	if [[ "$cur" == "-"\* ]]; then
opts=("${(@f)$(${words[@]:0:#words[@]-1} ${cur} --generate-shell-completion)}")
	else
		opts=("${(@f)$(${words[@]:0:#words[@]-1} --generate-shell-completion)}")
fi

    if [[ "${opts[1]}" != "" ]]; then
    	_describe 'values' opts
    else
    	_files
    fi

}

# don't run the completion function when being source-ed or eval-ed

if [ "$funcstack[1]" = "\_bsky" ]; then
\_bsky
fi

================================================
FILE: scripts/powershell*autocomplete.ps1
================================================
$fn = $($MyInvocation.MyCommand.Name)
$name = $fn -replace "(.*)\.ps1$", '$1'
Register-ArgumentCompleter -Native -CommandName $name -ScriptBlock {
     param($commandName, $wordToComplete, $cursorPosition)
     $other = "$wordToComplete --generate-shell-completion"
Invoke-Expression $other | ForEach-Object {
            [System.Management.Automation.CompletionResult]::new($*, $_, 'ParameterValue', $_)
}
}

================================================
FILE: .github/workflows/ci.yml
================================================
name: CI

on: [push, pull_request]

jobs:

build:
name: Build
runs-on: ubuntu-latest
steps: - name: Checkout code
uses: actions/checkout@master - name: Setup Go
uses: actions/setup-go@v2
with:
go-version: 1.x - name: Build
run: go build -v .

================================================
FILE: .github/workflows/release.yml
================================================
name: Release
on:
push:
tags: - 'v\*'
env:
GO_VERSION: stable

jobs:
build_for_linux:
name: Build for Linux
runs-on: ubuntu-latest
steps: - name: Install build dependencies
run: |
sudo apt-get -qq update
sudo apt-get install -y --no-install-recommends \
 build-essential - name: Checkout
uses: actions/checkout@v3
with:
fetch-depth: 0 - name: Setup Go
uses: actions/setup-go@v4
with:
go-version: ${{ env.GO_VERSION }} - name: Build amd64
env:
CGO_ENABLED: 1
GOOS: linux
GOARCH: amd64
run: make release - name: Archive artifacts
uses: actions/upload-artifact@v4
with:
name: dist-linux
path: bsky-linux-\*.zip

build_for_macos:
name: Build for MacOS
runs-on: macos-13 # Use macos-13 to build darwin/amd64. macos-latest is arm64.
steps: - name: Install build dependencies
run: brew install coreutils - name: Checkout
uses: actions/checkout@v3
with:
fetch-depth: 0 - name: Setup Go
uses: actions/setup-go@v4
with:
go-version: ${{ env.GO_VERSION }} - name: Build amd64
env:
CGO_ENABLED: 1
GOOS: darwin
GOARCH: amd64
run: make release - name: Archive artifacts
uses: actions/upload-artifact@v4
with:
name: dist-darwin
path: bsky-darwin-\*.zip

build_for_windows:
name: Build for Windows
runs-on: windows-latest
steps: - name: Install build dependencies
run: choco install zip - name: Checkout
uses: actions/checkout@v3
with:
fetch-depth: 0 - name: Setup Go
uses: actions/setup-go@v4
with:
go-version: ${{ env.GO_VERSION }} - name: Build amd64
shell: bash
env:
CGO_ENABLED: 1
GOOS: windows
GOARCH: amd64
run: make release - name: Archive artifacts
uses: actions/upload-artifact@v4
with:
name: dist-windows
path: bsky-windows-\*.zip

release:
name: Draft Release
needs: - build_for_linux - build_for_macos - build_for_windows
runs-on: ubuntu-latest
steps: - name: Download artifacts
uses: actions/download-artifact@v4 - name: Release
uses: softprops/action-gh-release@v1
if: startsWith(github.ref, 'refs/tags/')
with:
name: bsky ${{ github.ref_name }}
token: ${{ secrets.GITHUB_TOKEN }}
draft: true
generate_release_notes: true
files: dist-_/bsky_.\*
