<?php

declare(strict_types=1);

namespace App\Console\Commands\Dev;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeUseCaseCommand extends Command
{
    protected $signature = 'make:usecase {name}';
    protected $description = 'Create a new use case with input, output, and test files';

    public function handle(): void
    {
        $name = $this->argument('name');
        $useCaseDirectory = app_path("UseCase/{$name}UseCase");
        $testDirectory = base_path("tests/Unit/UseCase/{$name}UseCase");

        // 各ディレクトリを作成
        File::ensureDirectoryExists($useCaseDirectory);
        File::ensureDirectoryExists($testDirectory);

        // 各ファイルを作成
        $this->createFile("{$useCaseDirectory}/{$name}Input.php", $this->getInputStub($name));
        $this->createFile("{$useCaseDirectory}/{$name}Output.php", $this->getOutputStub($name));
        $this->createFile("{$useCaseDirectory}/{$name}UseCase.php", $this->getUseCaseStub($name));
        $this->createFile("{$testDirectory}/{$name}UseCaseTest.php", $this->getTestStub($name));

        $this->info("Use case '{$name}' created successfully.");
    }

    private function createFile(string $path, string $content): void
    {
        if (!File::exists($path)) {
            File::put($path, $content);
        }
    }

    private function getInputStub(string $name): string
    {
        return <<<PHP
<?php

declare(strict_types=1);

namespace App\UseCase\\{$name}UseCase;

use Illuminate\Support\Facades\Validator;

class {$name}Input
{
    public readonly string \$value;

    public function __construct(
        string|null \$value,
    ) {
        Validator::make(
            [
                "value" => \$value,
            ],
            \$this->rules()
        )
            ->validate();

        \$this->value = \$value ?? "";
    }

    private function rules(): array
    {
        return [
            "value" => ["required", "string", "max:255"],
        ];
    }
}
PHP;
    }

    private function getOutputStub(string $name): string
    {
        return <<<PHP
<?php

declare(strict_types=1);

namespace App\UseCase\\{$name}UseCase;

readonly class {$name}Output
{
    public function __construct(
        public string \$name,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            "name" => \$this->name,
        ];
    }
}
PHP;
    }

    private function getUseCaseStub(string $name): string
    {
        return <<<PHP
<?php

declare(strict_types=1);

namespace App\UseCase\\{$name}UseCase;

class {$name}UseCase
{
    public function execute({$name}Input \$input): {$name}Output
    {
        // 仮実装: ここでビジネスロジックを実装する
        return new {$name}Output(name: \$input->value);
    }
}
PHP;
    }

    private function getTestStub(string $name): string
    {
        return <<<PHP
<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\\{$name}UseCase;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\UseCase\\{$name}UseCase\\{$name}UseCase;
use App\UseCase\\{$name}UseCase\\{$name}Input;

class {$name}UseCaseTest extends TestCase
{
    use RefreshDatabase;

    public function test_execute(): void
    {
        // Given
        \$input = new {$name}Input('TestShop');

        // When
        \$useCase = resolve({$name}UseCase::class);
        \$output = \$useCase->execute(\$input);

        // Then
        self::assertEquals('TestShop', \$output->name);
    }
}
PHP;
    }
}
